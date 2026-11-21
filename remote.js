export const WORKSPACE_LINKS_PACKAGE = 'dsh-workspace-links'
export const WORKSPACE_LINKS_NAMESPACE = 'workspaceLinks'

function descriptor(method) {
  return {
    id: `${WORKSPACE_LINKS_PACKAGE}#${WORKSPACE_LINKS_NAMESPACE}/${method}`,
    service: WORKSPACE_LINKS_NAMESPACE,
    namespace: WORKSPACE_LINKS_NAMESPACE,
    method,
    invocation: { kind: 'direct' },
    parameters: [{
      name: 'request',
      wire: 'request',
      source: 'json',
      codec: { mode: 'src-json' },
    }],
    result: { mode: 'src-json' },
  }
}

export const WORKSPACE_LINKS_DESCRIPTORS = Object.freeze([
  descriptor('list'),
  descriptor('save'),
  descriptor('unlink'),
])

/** Register the UI-callable form of the same operations used by the agent tool. */
export function registerWorkspaceLinksRemote(ctx) {
  return ctx.typert.register({
    package: WORKSPACE_LINKS_PACKAGE,
    face: 'host',
    schemas: [],
    model: {
      services: [{
        key: WORKSPACE_LINKS_NAMESPACE,
        exportName: 'WorkspaceLinksService',
        description: 'Visual workspace-link management shared with the agent tool.',
        members: [
          { kind: 'method', name: 'list', signature: 'list(request: WorkspaceLinksListRequest): WorkspaceLinksListResult' },
          { kind: 'method', name: 'save', signature: 'save(request: WorkspaceLinksSaveRequest): Promise<WorkspaceLinksSaveResult>' },
          { kind: 'method', name: 'unlink', signature: 'unlink(request: WorkspaceLinksRemoveRequest): Promise<WorkspaceLinksRemoveResult>' },
        ],
        types: [
          { name: 'WorkspaceLinksListRequest', declaration: 'export interface WorkspaceLinksListRequest {}' },
          { name: 'WorkspaceLinksListResult', declaration: 'export interface WorkspaceLinksListResult { relations: unknown[]; workspaces: Array<{ id: string; name: string; path: string }> }' },
          { name: 'WorkspaceLinksSaveRequest', declaration: 'export interface WorkspaceLinksSaveRequest { aPath: string; bPath: string; aName?: string; bName?: string; aRole?: string | null; bRole?: string | null; description?: string | null }' },
          { name: 'WorkspaceLinksSaveResult', declaration: 'export interface WorkspaceLinksSaveResult { status: string; action: string; relation: unknown }' },
          { name: 'WorkspaceLinksRemoveRequest', declaration: 'export interface WorkspaceLinksRemoveRequest { aPath: string; bPath: string }' },
          { name: 'WorkspaceLinksRemoveResult', declaration: 'export interface WorkspaceLinksRemoveResult { status: string; relation?: unknown; aPath: string; bPath: string }' },
        ],
      }],
      events: [],
      objects: [],
    },
    invocations: WORKSPACE_LINKS_DESCRIPTORS,
  })
}
