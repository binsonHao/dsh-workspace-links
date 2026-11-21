import path from 'node:path'
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MAX_ROLE_LENGTH,
  buildWorkspaceView,
  deleteRelation,
  findRelation,
  normalizeRelations,
  renderWorkspaceContext,
  samePath,
  saveRelation,
} from './core.js'

function readText(args, key, maximum, required = false) {
  const raw = args[key]
  if (raw === undefined || raw === null) {
    if (required) throw new Error(`${key} 不能为空`)
    return undefined
  }
  if (typeof raw !== 'string') throw new Error(`${key} 必须是字符串`)
  const value = raw.trim()
  if (required && value.length === 0) throw new Error(`${key} 不能为空`)
  if (value.length > maximum) throw new Error(`${key} 不能超过 ${maximum} 个字符`)
  return value.length > 0 ? value : undefined
}

function readPatch(args, key, maximum) {
  if (!Object.hasOwn(args, key)) return { set: false }
  if (args[key] === null) return { set: true, value: undefined }
  return { set: true, value: readText(args, key, maximum) }
}

function publicWorkspace(workspace) {
  return { id: workspace.id, name: workspace.title, path: workspace.path }
}

export function createWorkspaceOperations(ctx, config = {}) {
  const relations = normalizeRelations(config.relations)
  const registryWorkspaces = () => ctx.workspaceRegistry.list()
  const registeredWorkspaces = () => registryWorkspaces().map(publicWorkspace)
  const viewFor = (agent) => buildWorkspaceView({
    relations,
    cwd: ctx.workingDirectory.get(agent.session),
    originalCwd: agent.session.header.cwd,
    workspaces: registryWorkspaces(),
  })

  const editRelations = async (change) => {
    const entry = ctx.fiber.entry
    if (entry === undefined) throw new Error('当前 Profile 不允许保存工作区关联配置')
    let outcome
    await ctx.configEditor.edit(entry, (current) => {
      outcome = change(normalizeRelations(current.relations))
      return { ...current, relations: outcome.relations }
    })
    return outcome
  }

  const list = (_request = {}) => ({
    relations,
    workspaces: registeredWorkspaces(),
  })

  const save = async (request) => {
    if (typeof request !== 'object' || request === null || Array.isArray(request)) throw new Error('参数必须是对象')
    const aPath = readText(request, 'aPath', 32_767, true)
    const bPath = readText(request, 'bPath', 32_767, true)
    if (samePath(aPath, bPath)) throw new Error('不能把工作区关联到自身')
    const aName = readPatch(request, 'aName', MAX_NAME_LENGTH)
    const bName = readPatch(request, 'bName', MAX_NAME_LENGTH)
    const aRole = readPatch(request, 'aRole', MAX_ROLE_LENGTH)
    const bRole = readPatch(request, 'bRole', MAX_ROLE_LENGTH)
    const description = readPatch(request, 'description', MAX_DESCRIPTION_LENGTH)

    // Validate both directories before registering either one, avoiding a partial registration on invalid input.
    await ctx.workspaceRegistry.resolveByPath(aPath)
    await ctx.workspaceRegistry.resolveByPath(bPath)
    const aEntity = await ctx.workspaceRegistry.create(aPath, aName.set ? aName.value : undefined)
    const bEntity = await ctx.workspaceRegistry.create(bPath, bName.set ? bName.value : undefined)
    if (samePath(aEntity.path, bEntity.path)) throw new Error('不能把工作区关联到自身')

    const outcome = await editRelations(currentRelations => {
      const existing = findRelation(currentRelations, aEntity.path, bEntity.path)
      const existingA = existing?.workspaces.find(item => samePath(item.path, aEntity.path))
      const existingB = existing?.workspaces.find(item => samePath(item.path, bEntity.path))
      const a = {
        path: aEntity.path,
        name: aName.set ? (aName.value ?? aEntity.title) : (existingA?.name ?? aEntity.title),
      }
      const b = {
        path: bEntity.path,
        name: bName.set ? (bName.value ?? bEntity.title) : (existingB?.name ?? bEntity.title),
      }
      const roleA = aRole.set ? aRole.value : existingA?.role
      const roleB = bRole.set ? bRole.value : existingB?.role
      const note = description.set ? description.value : existing?.description
      if (roleA !== undefined) a.role = roleA
      if (roleB !== undefined) b.role = roleB
      return saveRelation(currentRelations, {
        workspaces: [a, b],
        ...note === undefined ? {} : { description: note },
      })
    })
    return { status: 'saved', action: outcome.action, relation: outcome.relation }
  }

  const canonicalForRemove = async (value) => {
    try {
      const entity = await ctx.workspaceRegistry.resolveByPath(value)
      return entity?.path ?? value
    } catch {
      // An unavailable directory must not prevent removal of a stale relation.
      return path.normalize(path.resolve(value))
    }
  }

  const remove = async (request) => {
    if (typeof request !== 'object' || request === null || Array.isArray(request)) throw new Error('参数必须是对象')
    const requestedA = readText(request, 'aPath', 32_767, true)
    const requestedB = readText(request, 'bPath', 32_767, true)
    const aPath = await canonicalForRemove(requestedA)
    const bPath = await canonicalForRemove(requestedB)
    if (samePath(aPath, bPath)) throw new Error('不能解除工作区与自身的关联')
    const outcome = await editRelations(currentRelations => deleteRelation(currentRelations, aPath, bPath))
    return {
      status: outcome.relation === undefined ? 'not-found' : 'removed',
      relation: outcome.relation,
      aPath,
      bPath,
    }
  }

  const execute = async (args, exec) => {
    if (typeof args !== 'object' || args === null || Array.isArray(args)) throw new Error('参数必须是对象')
    const action = args.action ?? 'list'
    if (!['list', 'link', 'unlink'].includes(action)) throw new Error(`未知 action：${action}`)
    if (exec.agent === undefined) throw new Error('workspace_links 需要一个活动会话')

    if (action === 'list') {
      const view = viewFor(exec.agent)
      const registered = registeredWorkspaces()
      return JSON.stringify({
        currentWorkspace: view.current,
        relatedWorkspaces: view.related,
        registeredWorkspaces: registered.slice(0, 100),
        ...registered.length > 100 ? { registeredTruncated: true } : {},
        ...args.all === true ? { allRelations: relations } : {},
      }, null, 2)
    }

    const requestedPath = readText(args, 'path', 32_767, true)
    const cwd = ctx.workingDirectory.get(exec.agent.session)
    const current = viewFor(exec.agent).current
    const targetPath = path.resolve(cwd, requestedPath)
    exec.signal.throwIfAborted()

    if (action === 'unlink') {
      const result = await remove({ aPath: current.path, bPath: targetPath })
      exec.signal.throwIfAborted()
      return JSON.stringify({
        status: result.status,
        currentWorkspace: current,
        targetWorkspace: { path: result.bPath },
        removedRelation: result.relation,
        message: result.status === 'not-found' ? '没有找到这条关联，配置未发生变化。' : '关联已解除；工作区、目录及其他关联均未删除。',
      }, null, 2)
    }

    const result = await save({
      aPath: current.path,
      bPath: targetPath,
      ...Object.hasOwn(args, 'name') ? { bName: args.name } : {},
      ...Object.hasOwn(args, 'role') ? { bRole: args.role } : {},
      ...Object.hasOwn(args, 'currentName') ? { aName: args.currentName } : {},
      ...Object.hasOwn(args, 'currentRole') ? { aRole: args.currentRole } : {},
      ...Object.hasOwn(args, 'description') ? { description: args.description } : {},
    })
    exec.signal.throwIfAborted()
    return JSON.stringify({
      ...result,
      message: '关联已持久保存。当前会话后续请求及两个工作区的新会话都会自动获得对应的项目上下文。',
    }, null, 2)
  }

  return { relations, viewFor, list, save, remove, execute }
}

export function installWorkspaceRuntime(ctx, config = {}) {
  const operations = createWorkspaceOperations(ctx, config)

  ctx.effect(() => ctx.systemPrompt.context({
    name: 'workspace-links:related',
    order: 105,
    required: true,
    interpolate: false,
    text: context => context.agent === undefined ? '' : renderWorkspaceContext(operations.viewFor(context.agent)),
  }), 'workspace-links.context')

  ctx.effect(() => ctx.tools.register({
    name: 'workspace_links',
    description: '查询、建立或解除当前会话工作区与其他项目的持久关联。设置页是主要管理方式；本工具用于 AI 按需读取，或仅当用户明确要求通过 AI 建立、解除关联时使用 link/unlink。list 返回当前关联和 DSH 已注册工作区；link 将当前工作区与 path 指定的现有目录双向关联；unlink 只解除关系，不删除工作区或目录。关联本身不授予目标目录的读写权限。',
    parameters: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['list', 'link', 'unlink'],
          description: 'list（默认）查询；link 新建或更新关联；unlink 解除关联。',
        },
        path: { type: 'string', description: '目标工作区目录。link/unlink 必填；可以是绝对路径或相对当前目录的路径。' },
        name: { type: 'string', description: '目标工作区的显示名称；link 可选，默认使用 DSH 工作区标题。' },
        role: { type: 'string', description: '目标项目角色，例如“Vue 前端”或“Spring Boot 后端”；link 可选。' },
        description: { type: 'string', description: '两个项目如何协作的简短备注；link 可选。' },
        currentName: { type: 'string', description: '当前工作区的显示名称；link 可选。' },
        currentRole: { type: 'string', description: '当前项目角色；link 可选。' },
        all: { type: 'boolean', description: 'list 时是否同时返回全部关联记录，默认 false。' },
      },
      additionalProperties: false,
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    timeoutMs: 15_000,
    isConcurrencySafe: args => (args?.action ?? 'list') === 'list',
    presentCall: args => ({
      card: 'generic',
      title: args?.action === 'link' ? '建立工作区关联' : args?.action === 'unlink' ? '解除工作区关联' : '查看工作区关联',
      kind: (args?.action ?? 'list') === 'list' ? 'read' : 'edit',
      rawInput: args,
    }),
    execute: operations.execute,
  }), 'workspace-links.tool')

  return operations
}
