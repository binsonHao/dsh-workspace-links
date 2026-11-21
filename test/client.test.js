import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { WORKSPACE_LINKS_DESCRIPTORS } from '../remote.js'

function loadClient() {
  let definition
  const context = {
    window: {
      __ModuleLoader__: {
        load(value) { definition = value },
      },
    },
    console,
  }
  vm.runInNewContext(readFileSync(new URL('../client.js', import.meta.url), 'utf8'), context)
  assert.equal(definition.id, 'dsh-workspace-links')
  return definition.factory(name => {
    if (name === 'react') return { createElement: () => ({}) }
    throw new Error(`Unexpected browser module: ${name}`)
  })
}

test('可视化设置页挂载并调用共享 Host Remote 操作', async () => {
  const plugin = loadClient()
  assert.equal(plugin.inject.join(','), 'remote,slots,locale,uiWorkspace')
  const registrations = []
  const calls = []
  let mounted
  const service = {
    async list(request) { calls.push(['list', request]); return { ok: true, value: { relations: [], workspaces: [] } } },
    async save(request) { calls.push(['save', request]); return { ok: true, value: { action: 'created', relation: null } } },
    async unlink(request) { calls.push(['unlink', request]); return { ok: true, value: { status: 'removed' } } },
  }
  const ctx = {
    remote: {
      async $mount(remote) { mounted = remote; return () => {} },
      namespaces: { get: () => ({ service }) },
    },
    locale: {
      register() { return () => {} },
      bind() { return key => key },
    },
    slots: {
      inject(_key, callback) { callback() },
      register(options, component) { registrations.push({ options, component }); return () => {} },
    },
    effect(callback) { callback() },
    async pickDirectory() { return undefined },
    uiWorkspace: { async pickDirectory() { return 'F:\\picked\\workspace' } },
  }
  await plugin.apply(ctx)

  assert.equal(mounted.package, 'dsh-workspace-links')
  assert.equal(mounted.descriptors.map(item => item.method).join(','), 'list,save,unlink')
  assert.equal(mounted.descriptors.map(item => item.id).join(','), WORKSPACE_LINKS_DESCRIPTORS.map(item => item.id).join(','))
  assert.ok(mounted.descriptors.every(item => item.result.mode === 'strict'))
  assert.ok(mounted.descriptors.every(item => item.result.create().parse({}) !== undefined))
  const section = registrations.find(item => item.options.name === 'settings.section')
  assert.equal(section.options.id, 'workspace-links')
  assert.equal(typeof section.component, 'function')
  assert.ok(registrations.some(item => item.options.name === 'settings.section.icon'))

  const face = section.options.inject()
  await face.api.list()
  await face.api.save({ aPath: 'F:\\a', bPath: 'F:\\b' })
  await face.api.unlink({ aPath: 'F:\\a', bPath: 'F:\\b' })
  assert.deepEqual(calls.map(call => call[0]), ['list', 'save', 'unlink'])
  assert.equal(await face.pickDirectory(), 'F:\\picked\\workspace')
})

test('Remote 挂载失败时页面仍注册并显示明确错误', async () => {
  const plugin = loadClient()
  const registrations = []
  const ctx = {
    remote: {
      async $mount() { throw new Error('mount boom') },
      namespaces: { get: () => undefined },
    },
    locale: { register() { return () => {} }, bind() { return key => key } },
    slots: {
      inject(_key, callback) { callback() },
      register(options, component) { registrations.push({ options, component }); return () => {} },
    },
    effect(callback) { callback() },
    uiWorkspace: { async pickDirectory() { return null } },
  }
  await plugin.apply(ctx)
  const section = registrations.find(item => item.options.name === 'settings.section')
  assert.equal(section.options.id, 'workspace-links')
  await assert.rejects(section.options.inject().api.list(), /mount boom/)
})
