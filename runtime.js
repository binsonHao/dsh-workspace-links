import path from 'node:path'
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_GROUP_MEMBERS,
  MAX_NAME_LENGTH,
  MAX_ROLE_LENGTH,
  buildWorkspaceView,
  deleteGroup,
  normalizeRelations,
  relationKey,
  renderWorkspaceContext,
  samePath,
  saveGroup,
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

  const memberRequests = (request) => {
    if (Array.isArray(request.members)) {
      return request.members.map((member, index) => {
        if (typeof member !== 'object' || member === null || Array.isArray(member)) {
          throw new Error(`members[${index}] 必须是对象`)
        }
        return {
          path: readText(member, 'path', 32_767, true),
          name: readPatch(member, 'name', MAX_NAME_LENGTH),
          role: readPatch(member, 'role', MAX_ROLE_LENGTH),
        }
      })
    }
    if (request.aPath !== undefined || request.bPath !== undefined) {
      return [
        {
          path: readText(request, 'aPath', 32_767, true),
          name: readPatch(request, 'aName', MAX_NAME_LENGTH),
          role: readPatch(request, 'aRole', MAX_ROLE_LENGTH),
        },
        {
          path: readText(request, 'bPath', 32_767, true),
          name: readPatch(request, 'bName', MAX_NAME_LENGTH),
          role: readPatch(request, 'bRole', MAX_ROLE_LENGTH),
        },
      ]
    }
    throw new Error('members 必须包含 2 个以上工作区')
  }

  const save = async (request) => {
    if (typeof request !== 'object' || request === null || Array.isArray(request)) throw new Error('参数必须是对象')
    const requested = memberRequests(request)
    if (requested.length < 2 || requested.length > MAX_GROUP_MEMBERS) {
      throw new Error(`一个关联组必须包含 2–${MAX_GROUP_MEMBERS} 个工作区`)
    }
    for (let left = 0; left < requested.length; left++) {
      for (let right = left + 1; right < requested.length; right++) {
        if (samePath(requested[left].path, requested[right].path)) throw new Error('关联组不能包含重复的工作区')
      }
    }
    const originalKey = Object.hasOwn(request, 'originalKey') ? readText(request, 'originalKey', 100_000) : undefined
    const description = readPatch(request, 'description', MAX_DESCRIPTION_LENGTH)

    // Validate every directory before registering any of them, avoiding partial registration on invalid input.
    for (const member of requested) await ctx.workspaceRegistry.resolveByPath(member.path)
    const entities = []
    for (const member of requested) {
      entities.push(await ctx.workspaceRegistry.create(member.path, member.name.set ? member.name.value : undefined))
    }
    for (let left = 0; left < entities.length; left++) {
      for (let right = left + 1; right < entities.length; right++) {
        if (samePath(entities[left].path, entities[right].path)) throw new Error('关联组不能包含重复的工作区')
      }
    }

    const outcome = await editRelations(currentRelations => {
      const candidate = {
        workspaces: entities.map(entity => ({ path: entity.path })),
      }
      const existing = originalKey === undefined
        ? currentRelations.find(item => relationKey(item) === relationKey(candidate))
        : currentRelations.find(item => relationKey(item) === originalKey)
      const workspaces = entities.map((entity, index) => {
        const patch = requested[index]
        const old = existing?.workspaces.find(item => samePath(item.path, entity.path))
        const workspace = {
          path: entity.path,
          name: patch.name.set ? (patch.name.value ?? entity.title) : (old?.name ?? entity.title),
        }
        const role = patch.role.set ? patch.role.value : old?.role
        if (role !== undefined) workspace.role = role
        return workspace
      })
      const note = description.set ? description.value : existing?.description
      return saveGroup(currentRelations, {
        workspaces,
        ...note === undefined ? {} : { description: note },
      }, originalKey)
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
    const requestedPaths = Array.isArray(request.paths)
      ? request.paths
      : [readText(request, 'aPath', 32_767, true), readText(request, 'bPath', 32_767, true)]
    if (requestedPaths.length < 2 || requestedPaths.length > MAX_GROUP_MEMBERS) {
      throw new Error(`一个关联组必须包含 2–${MAX_GROUP_MEMBERS} 个工作区`)
    }
    const paths = []
    for (let index = 0; index < requestedPaths.length; index++) {
      const value = readText({ value: requestedPaths[index] }, 'value', 32_767, true)
      const canonical = await canonicalForRemove(value)
      if (paths.some(item => samePath(item, canonical))) throw new Error('关联组不能包含重复的工作区')
      paths.push(canonical)
    }
    const outcome = await editRelations(currentRelations => deleteGroup(currentRelations, paths))
    return {
      status: outcome.relation === undefined ? 'not-found' : 'removed',
      relation: outcome.relation,
      paths,
    }
  }

  const execute = async (args, exec) => {
    if (typeof args !== 'object' || args === null || Array.isArray(args)) throw new Error('参数必须是对象')
    const action = args.action ?? 'list'
    if (!['list', 'link', 'group', 'unlink'].includes(action)) throw new Error(`未知 action：${action}`)
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

    if (action === 'group') {
      if (!Array.isArray(args.members)) throw new Error('action=group 需要 members 数组')
      const result = await save({
        members: args.members,
        ...Object.hasOwn(args, 'description') ? { description: args.description } : {},
      })
      exec.signal.throwIfAborted()
      return JSON.stringify({
        ...result,
        message: '工作区组已保存。组内任意工作区都能自动获得其他成员的路径、角色和备注。',
      }, null, 2)
    }

    const requestedPath = readText(args, 'path', 32_767, true)
    const cwd = ctx.workingDirectory.get(exec.agent.session)
    const current = viewFor(exec.agent).current
    const targetPath = path.resolve(cwd, requestedPath)
    exec.signal.throwIfAborted()

    if (action === 'unlink') {
      const result = await remove({ paths: [current.path, targetPath] })
      exec.signal.throwIfAborted()
      return JSON.stringify({
        status: result.status,
        currentWorkspace: current,
        targetWorkspace: { path: result.paths[1] },
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
    description: '查询、建立或解除工作区关联/关联组。设置页是主要管理方式；本工具用于 AI 按需读取，或仅当用户明确要求时使用 link/group/unlink。一个关联组包含 2–20 个工作区，组内任意成员都能看到其他成员的路径、角色和备注。list 返回当前关联和 DSH 已注册工作区；link 建立两个工作区的关联；group 用 members 数组建立多人组；unlink 解除当前工作区与目标的关系。关联本身不授予目标目录的读写权限。',
    parameters: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['list', 'link', 'group', 'unlink'],
          description: 'list（默认）查询；link 建立两个工作区的关联；group 建立 2–20 个工作区组；unlink 解除关联。',
        },
        path: { type: 'string', description: '目标工作区目录。link/unlink 必填；可以是绝对路径或相对当前目录的路径。' },
        members: {
          type: 'array',
          description: 'action=group 时的组成员，2–20 个。',
          items: {
            type: 'object',
            properties: {
              path: { type: 'string', description: '工作区绝对路径。' },
              name: { type: 'string', description: '显示名称。' },
              role: { type: 'string', description: '项目角色。' },
            },
            required: ['path'],
            additionalProperties: false,
          },
        },
        name: { type: 'string', description: '目标工作区的显示名称；link 可选，默认使用 DSH 工作区标题。' },
        role: { type: 'string', description: '目标项目角色，例如“Vue 前端”或“Spring Boot 后端”；link 可选。' },
        description: { type: 'string', description: '关联组内项目如何协作的简短备注；link/group 可选。' },
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
      title: args?.action === 'link' ? '建立工作区关联' : args?.action === 'group' ? '建立工作区组' : args?.action === 'unlink' ? '解除工作区关联' : '查看工作区关联',
      kind: (args?.action ?? 'list') === 'list' ? 'read' : 'edit',
      rawInput: args,
    }),
    execute: operations.execute,
  }), 'workspace-links.tool')

  return operations
}
