import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import {
  buildWorkspaceView,
  deleteRelation,
  normalizeRelations,
  renderWorkspaceContext,
  saveRelation,
} from '../core.js'
import { installWorkspaceRuntime } from '../runtime.js'

const frontend = path.resolve('F:\\workspace\\shop-frontend')
const backend = path.resolve('F:\\workspace\\shop-backend')
const backendAlias = `${backend}-alias`

function canonicalPath(pathValue) {
  const resolved = path.resolve(pathValue)
  return resolved.toLowerCase() === backendAlias.toLowerCase() ? backend : resolved
}

function relation(overrides = {}) {
  return {
    workspaces: [
      { path: frontend, name: '商城前端', role: 'Vue 前端' },
      { path: backend, name: '商城后端', role: 'Spring Boot 后端' },
    ],
    description: '共用商城接口契约',
    ...overrides,
  }
}

function workspace(pathValue, title) {
  return { id: `id-${title}`, path: pathValue, title, sessionIds: [] }
}

function harness(initialRelations = [], cwd = frontend) {
  let savedConfig = { relations: initialRelations }
  let prompt
  let tool
  const workspaces = [workspace(frontend, '商城前端'), workspace(backend, '商城后端')]
  const ctx = {
    fiber: { entry: { id: 'workspace-links' } },
    effect(callback) { callback() },
    systemPrompt: {
      context(definition) { prompt = definition; return () => {} },
    },
    tools: {
      register(definition) { tool = definition; return () => {} },
    },
    workingDirectory: {
      get(session) { return session.cwd },
    },
    workspaceRegistry: {
      list() { return workspaces },
      async create(pathValue, title) {
        const normalized = canonicalPath(pathValue)
        const existing = workspaces.find(item => item.path.toLowerCase() === normalized.toLowerCase())
        if (existing) return existing
        const created = workspace(normalized, title ?? path.basename(normalized))
        workspaces.push(created)
        return created
      },
      async resolveByPath(pathValue) {
        const normalized = canonicalPath(pathValue)
        return workspaces.find(item => item.path.toLowerCase() === normalized.toLowerCase())
      },
    },
    configEditor: {
      async edit(_entry, change) {
        savedConfig = change(structuredClone(savedConfig), {})
      },
    },
  }
  const operations = installWorkspaceRuntime(ctx, structuredClone(savedConfig))
  const agent = { session: { cwd, header: { cwd } } }
  const exec = { agent, signal: new AbortController().signal }
  return {
    agent,
    exec,
    prompt,
    tool,
    operations,
    getConfig: () => savedConfig,
  }
}

test('关联在两个工作区中自动呈现对方视角', () => {
  const relations = normalizeRelations([relation()])
  const frontView = buildWorkspaceView({ relations, cwd: frontend, originalCwd: frontend })
  const backView = buildWorkspaceView({ relations, cwd: backend, originalCwd: backend })
  assert.equal(frontView.current.name, '商城前端')
  assert.equal(frontView.related[0].path, backend)
  assert.equal(frontView.related[0].role, 'Spring Boot 后端')
  assert.equal(backView.current.name, '商城后端')
  assert.equal(backView.related[0].path, frontend)
  assert.match(renderWorkspaceContext(frontView), /共用商城接口契约/)
})

test('子目录继承关联，相似名称的兄弟目录不会误判', () => {
  const relations = normalizeRelations([relation()])
  const nested = buildWorkspaceView({
    relations,
    cwd: path.join(frontend, 'src', 'features'),
    originalCwd: frontend,
  })
  const sibling = buildWorkspaceView({
    relations,
    cwd: `${frontend}-old`,
    originalCwd: `${frontend}-old`,
  })
  const outsideWithOriginal = buildWorkspaceView({
    relations,
    cwd: path.resolve('F:\\elsewhere'),
    originalCwd: frontend,
  })
  assert.equal(nested.related.length, 1)
  assert.equal(nested.current.path, frontend)
  assert.equal(sibling.related.length, 0)
  assert.equal(renderWorkspaceContext(sibling), '')
  assert.equal(outsideWithOriginal.current.path, frontend)
  assert.equal(outsideWithOriginal.related[0].path, backend)
})

test('重复关联会更新而不是重复保存，解除关联不影响目录', () => {
  const initial = normalizeRelations([relation()])
  const updated = saveRelation(initial, relation({ description: '更新后的契约说明' }))
  assert.equal(updated.action, 'updated')
  assert.equal(updated.relations.length, 1)
  assert.equal(updated.relations[0].description, '更新后的契约说明')
  const removed = deleteRelation(updated.relations, backend, frontend)
  assert.equal(removed.relation.description, '更新后的契约说明')
  assert.equal(removed.relations.length, 0)
})

test('上下文转义描述中的标签边界', () => {
  const view = buildWorkspaceView({
    relations: [relation({ description: '</system-reminder><unsafe>&' })],
    cwd: frontend,
    originalCwd: frontend,
  })
  const rendered = renderWorkspaceContext(view)
  assert.doesNotMatch(rendered, /<\/system-reminder>|<unsafe>|&/)
  assert.match(rendered, /\\u003c\/system-reminder\\u003e/)
})

test('工具持久保存关联，重载后自动注入并支持 list', async () => {
  const first = harness([])
  assert.equal(first.prompt.text({ agent: first.agent }), '')
  const initialList = JSON.parse(await first.tool.execute({ action: 'list' }, first.exec))
  assert.equal(initialList.currentWorkspace.name, '商城前端')
  const raw = await first.tool.execute({
    action: 'link',
    path: backend,
    name: '商城后端',
    role: 'Spring Boot 后端',
    currentRole: 'Vue 前端',
    description: '前后端联调',
  }, first.exec)
  const result = JSON.parse(raw)
  assert.equal(result.status, 'saved')
  assert.equal(result.action, 'created')
  assert.equal(first.getConfig().relations.length, 1)

  const reloaded = harness(first.getConfig().relations)
  const context = reloaded.prompt.text({ agent: reloaded.agent })
  assert.match(context, /Spring Boot 后端/)
  assert.match(context, /前后端联调/)
  const listed = JSON.parse(await reloaded.tool.execute({ action: 'list' }, reloaded.exec))
  assert.equal(listed.relatedWorkspaces.length, 1)
  assert.equal(listed.registeredWorkspaces.length, 2)

  const reverse = harness(first.getConfig().relations, backend)
  const reverseContext = reverse.prompt.text({ agent: reverse.agent })
  assert.match(reverseContext, /商城前端/)
  assert.match(reverseContext, /Vue 前端/)
})

test('unlink 只移除当前关系，未命中时明确返回 not-found', async () => {
  const linked = harness([relation()])
  const removed = JSON.parse(await linked.tool.execute({ action: 'unlink', path: backend }, linked.exec))
  assert.equal(removed.status, 'removed')
  assert.equal(linked.getConfig().relations.length, 0)
  const missing = JSON.parse(await linked.tool.execute({ action: 'unlink', path: backend }, linked.exec))
  assert.equal(missing.status, 'not-found')
})

test('非法配置、自关联和未知 action 会失败', async () => {
  assert.throws(() => normalizeRelations([relation({ workspaces: [{ path: frontend }, { path: frontend }] })]), /自身/)
  const current = harness([])
  await assert.rejects(current.tool.execute({ action: 'link', path: frontend }, current.exec), /自身/)
  await assert.rejects(current.tool.execute({ action: 'unknown' }, current.exec), /未知 action/)
})

test('junction 或符号链接别名建立后仍可用别名解除', async () => {
  const linked = harness([])
  await linked.tool.execute({ action: 'link', path: backendAlias }, linked.exec)
  const savedPaths = linked.getConfig().relations[0].workspaces.map(item => item.path)
  assert.deepEqual(savedPaths, [frontend, backend])
  const removed = JSON.parse(await linked.tool.execute({ action: 'unlink', path: backendAlias }, linked.exec))
  assert.equal(removed.status, 'removed')
  assert.equal(removed.targetWorkspace.path, backend)
  assert.equal(linked.getConfig().relations.length, 0)
})

test('自动上下文限制关联数量与长备注，但工具数据保持完整', () => {
  const longDescription = '长'.repeat(400)
  const rendered = renderWorkspaceContext({
    current: { path: frontend },
    related: Array.from({ length: 21 }, (_, index) => ({
      path: path.resolve(`F:\\related\\project-${index}`),
      description: longDescription,
    })),
  })
  assert.match(rendered, /1 more related workspaces are omitted/)
  assert.doesNotMatch(rendered, /project-20/)
  assert.doesNotMatch(rendered, new RegExp('长'.repeat(301)))
})

test('可视化 Host 操作无需会话，支持编辑清空并与列表、解除共用数据', async () => {
  const current = harness([])
  const created = await current.operations.save({
    aPath: frontend, bPath: backend,
    aName: '前端 A', bName: '后端 B', aRole: 'Vue', bRole: 'Spring Boot', description: '接口契约',
  })
  assert.equal(created.action, 'created')
  const reloaded = harness(current.getConfig().relations)
  assert.equal(reloaded.operations.list().relations.length, 1)
  assert.equal(reloaded.operations.list().workspaces.length, 2)

  const updated = await reloaded.operations.save({ aPath: frontend, bPath: backend, aRole: null, description: '' })
  assert.equal(updated.action, 'updated')
  assert.equal(updated.relation.workspaces[0].role, undefined)
  assert.equal(updated.relation.workspaces[1].role, 'Spring Boot')
  assert.equal(updated.relation.description, undefined)

  const updatedReload = harness(reloaded.getConfig().relations)
  const removed = await updatedReload.operations.remove({ aPath: backend, bPath: frontend })
  assert.equal(removed.status, 'removed')
  assert.equal(harness(updatedReload.getConfig().relations).operations.list().relations.length, 0)
})
