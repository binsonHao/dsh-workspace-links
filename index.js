import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import { installWorkspaceRuntime } from './runtime.js'
import { registerWorkspaceLinksRemote } from './remote.js'

export const name = 'workspace-links'
export const inject = ['tools', 'systemPrompt', 'workingDirectory', 'workspaceRegistry', 'configEditor', 'typert']

/** Host service shared by the visual settings page and the optional agent tool. */
export default class WorkspaceLinksService extends TypertRemoteService {
  static inject = inject

  constructor(ctx, config = {}) {
    super(ctx, 'workspaceLinks')
    this.operations = installWorkspaceRuntime(ctx, config)
    ctx.effect(() => registerWorkspaceLinksRemote(ctx), 'workspace-links.remote')
  }

  list(request = {}) {
    return this.operations.list(request)
  }

  async save(request) {
    return this.operations.save(request)
  }

  async unlink(request) {
    return this.operations.remove(request)
  }
}
