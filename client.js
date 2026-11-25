window.__ModuleLoader__.load({
  id: 'dsh-workspace-links',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'workspace-links';
    const SECTION_ID = 'workspace-links';
    const PACKAGE = 'dsh-workspace-links';
    const NAMESPACE = 'workspaceLinks';
    const MAX_GROUP_MEMBERS = 20;

    const passthrough = { parse: value => value };
    const descriptor = method => ({
      id: `${PACKAGE}#${NAMESPACE}/${method}`,
      service: NAMESPACE,
      namespace: NAMESPACE,
      method,
      invocation: { kind: 'direct' },
      parameters: [{
        name: 'request', wire: 'request', source: 'json',
        codec: {
          mode: 'strict', typeSymbol: `${PACKAGE}#WorkspaceLinksRequest`,
          schema: passthrough, create: () => passthrough, jsonSchema: { type: 'object' },
        },
      }],
      result: {
        mode: 'strict', typeSymbol: `${PACKAGE}#WorkspaceLinksResult`,
        schema: passthrough, create: () => passthrough, jsonSchema: {},
      },
    });
    const REMOTE = { package: PACKAGE, descriptors: [descriptor('list'), descriptor('save'), descriptor('unlink')] };

    const zh = {
      nav: '工作区关联', title: '工作区关联',
      description: '把前端、后端、移动端等项目加入同一个关联组。组内任意工作区都能自动获得其他成员的名称、路径、角色和备注。',
      current: '当前工作区', add: '新建关联组', addFirst: '新建第一组关联', refresh: '刷新', refreshing: '正在刷新…',
      createTitle: '新建工作区关联组', editTitle: '编辑工作区关联组', addMember: '添加工作区', removeMember: '移除',
      memberLabel: '工作区 {index}', memberCount: '{count} 个工作区', workspacePath: '工作区目录',
      selectWorkspace: '请选择工作区', browse: '选择目录…', name: '显示名称', role: '项目角色',
      namePlaceholder: '默认使用工作区标题', rolePlaceholder: '例如：Vue 前端、Spring Boot 后端', note: '协作备注',
      notePlaceholder: '例如：前后端共用 API 契约，修改接口时同步检查两边。',
      groupHelp: '一个组可包含 2–{max} 个工作区；组内任一成员都能看到其他成员的路径、角色和备注。',
      back: '返回列表', discardConfirm: '放弃未保存的修改并返回列表？', save: '保存关联组', saving: '正在保存…', cancel: '取消', edit: '编辑', remove: '解除关联',
      removeTitle: '确认解除这组关联', removeDescription: '只删除这组关联，不会删除工作区、会话或任何项目文件。', confirmRemove: '确认解除', removing: '正在解除…',
      created: '关联组已创建，组内工作区后续请求会自动获得其他成员的项目上下文。', updated: '关联组已更新。', removed: '关联组已解除；工作区和项目文件均未改动。',
      notFound: '这组关联已经不存在，列表已刷新。', saveFailed: '保存关联组失败：{message}', removeFailed: '解除关联组失败：{message}',
      loadFailed: '读取工作区关联失败：{message}', browseFailed: '选择目录失败：{message}', samePath: '组内不能重复选择同一个工作区。',
      requiredPath: '一个关联组至少需要两个工作区。', emptyTitle: '还没有工作区关联组', emptyDescription: '把前端、后端、移动端等项目连接起来，之后无需再向 AI 重复提供项目路径。',
      noMatches: '没有匹配的关联组', resultsLabel: '工作区关联组列表', count: '共 {total} 组关联', filteredCount: '显示 {shown} / {total} 组关联',
      searchLabel: '搜索关联组', searchPlaceholder: '名称、路径、角色或备注', clearSearch: '清空搜索', loading: '正在读取工作区关联…',
      readonly: '当前身份只能查看关联，不能修改。', readonlySave: '当前身份不能新建或编辑关联组，但可以解除已有关系。', readonlyRemove: '当前身份不能解除关联组，但可以新建或编辑关系。',
      savedRefreshFailed: '关联组已保存，但列表刷新失败；请点击“刷新”查看最新状态。', savedRefreshFailedRemove: '关联组已解除，但列表刷新失败；请点击“刷新”查看最新状态。',
      rolesMissing: '未设置项目角色', noteMissing: '未填写协作备注',
    };
    const en = {
      nav: 'Workspace links', title: 'Workspace links',
      description: 'Put frontend, backend, mobile, and other projects in one linked group. Every member automatically receives the other members’ names, paths, roles, and notes.',
      current: 'Current workspace', add: 'New group', addFirst: 'Create your first group', refresh: 'Refresh', refreshing: 'Refreshing…',
      createTitle: 'New workspace group', editTitle: 'Edit workspace group', addMember: 'Add workspace', removeMember: 'Remove',
      memberLabel: 'Workspace {index}', memberCount: '{count} workspaces', workspacePath: 'Workspace directory',
      selectWorkspace: 'Select a workspace', browse: 'Choose directory…', name: 'Display name', role: 'Project role',
      namePlaceholder: 'Defaults to the workspace title', rolePlaceholder: 'For example: Vue frontend, Spring Boot backend', note: 'Collaboration notes',
      notePlaceholder: 'For example: both projects share an API contract and must be checked together.',
      groupHelp: 'A group can contain 2–{max} workspaces. Every member sees the paths, roles, and notes of all other members.',
      back: 'Back to list', discardConfirm: 'Discard unsaved changes and return to the list?', save: 'Save group', saving: 'Saving…', cancel: 'Cancel', edit: 'Edit', remove: 'Unlink',
      removeTitle: 'Unlink this group?', removeDescription: 'Only this relationship is removed. Workspaces, sessions, and project files are not deleted.', confirmRemove: 'Unlink', removing: 'Unlinking…',
      created: 'Group created. Members will receive the other projects’ context in subsequent requests.', updated: 'Group updated.', removed: 'Group removed. Workspaces and project files were not changed.',
      notFound: 'This group no longer exists. The list has been refreshed.', saveFailed: 'Could not save the group: {message}', removeFailed: 'Could not unlink the group: {message}',
      loadFailed: 'Could not load workspace links: {message}', browseFailed: 'Could not choose a directory: {message}', samePath: 'Choose different workspaces within the group.',
      requiredPath: 'A group needs at least two workspaces.', emptyTitle: 'No workspace groups yet', emptyDescription: 'Connect frontend, backend, mobile, or other related projects so you no longer need to repeat their paths to agents.',
      noMatches: 'No matching groups', resultsLabel: 'Workspace group list', count: '{total} groups', filteredCount: 'Showing {shown} of {total} groups',
      searchLabel: 'Search groups', searchPlaceholder: 'Name, path, role, or notes', clearSearch: 'Clear search', loading: 'Loading workspace links…',
      readonly: 'Your current identity can view links but cannot change them.', readonlySave: 'Your current identity cannot create or edit groups, but can unlink existing ones.', readonlyRemove: 'Your current identity cannot unlink groups, but can create or edit them.',
      savedRefreshFailed: 'The group was saved, but refreshing the list failed. Choose Refresh to see the latest state.', savedRefreshFailedRemove: 'The group was removed, but refreshing the list failed. Choose Refresh to see the latest state.',
      rolesMissing: 'No project role set', noteMissing: 'No collaboration notes',
    };

    const styles = `
      .wsl-page { width: 100%; max-width: 980px; color: var(--dsw-alias-label-primary); font-size: 14px; line-height: 1.55; }
      .wsl-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
      .wsl-heading { margin: 3px 0 5px; font-size: 21px; line-height: 29px; font-weight: 600; }
      .wsl-description { max-width: 720px; margin: 0; color: var(--dsw-alias-label-secondary); }
      .wsl-current { margin: 8px 0 0; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .wsl-actions { display: flex; flex: none; gap: 8px; }
      .wsl-button { min-height: 34px; padding: 6px 13px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer; }
      .wsl-button:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-brand-primary); }
      .wsl-button:disabled { cursor: not-allowed; opacity: 0.55; }
      .wsl-button-primary { border-color: var(--dsw-alias-label-primary); background: var(--dsw-alias-label-primary); color: var(--dsw-alias-bg-base); }
      .wsl-button-primary:hover:not(:disabled) { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-label-primary); color: var(--dsw-alias-bg-base); }
      .wsl-button-danger { color: var(--dsw-alias-state-error-primary); }
      .wsl-button-small { min-height: 28px; padding: 3px 9px; font-size: 12px; }
      .wsl-button:focus-visible, .wsl-input:focus, .wsl-select:focus, .wsl-textarea:focus { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .wsl-panel { margin-bottom: 16px; padding: 18px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); }
      .wsl-panel-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
      .wsl-panel-title { margin: 0; font-size: 16px; line-height: 22px; font-weight: 600; }
      .wsl-members { display: flex; flex-direction: column; gap: 10px; }
      .wsl-member { padding: 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; background: var(--dsw-alias-bg-base); }
      .wsl-member-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 9px; }
      .wsl-member-title { margin: 0; font-size: 13px; font-weight: 600; }
      .wsl-member-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px 14px; margin-top: 9px; }
      .wsl-add-member { width: 100%; margin-top: 10px; border-style: dashed; }
      .wsl-field { min-width: 0; }
      .wsl-label { display: block; margin-bottom: 5px; font-size: 12px; font-weight: 500; }
      .wsl-select-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }
      .wsl-select-row .wsl-button { white-space: nowrap; }
      .wsl-select, .wsl-input, .wsl-textarea { box-sizing: border-box; width: 100%; min-width: 0; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font: inherit; }
      .wsl-select, .wsl-input { height: 38px; padding: 0 10px; }
      .wsl-textarea { min-height: 86px; padding: 9px 10px; resize: vertical; }
      .wsl-select:disabled, .wsl-input:disabled, .wsl-textarea:disabled { opacity: 0.65; }
      .wsl-input::placeholder, .wsl-textarea::placeholder { color: var(--dsw-alias-label-secondary); opacity: 0.75; }
      .wsl-help { margin: 9px 0 0; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .wsl-form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
      .wsl-notice { margin-bottom: 12px; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
      .wsl-notice-success { border-color: var(--dsw-alias-state-success-primary); }
      .wsl-notice-warn { border-color: var(--dsw-alias-state-warn-primary); }
      .wsl-notice-error { border-color: var(--dsw-alias-state-error-primary); color: var(--dsw-alias-state-error-primary); }
      .wsl-toolbar { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 12px; }
      .wsl-search { flex: 1; max-width: 480px; }
      .wsl-count { flex: none; margin: 0 0 9px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .wsl-list { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
      .wsl-card { padding: 16px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 11px; background: var(--dsw-alias-bg-layer-1); }
      .wsl-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
      .wsl-card-main { flex: 1; min-width: 0; }
      .wsl-group-meta { margin-bottom: 7px; color: var(--dsw-alias-label-secondary); font-size: 12px; font-weight: 500; }
      .wsl-card-members { display: flex; flex-direction: column; }
      .wsl-member-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: start; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--dsw-alias-border-l1); }
      .wsl-member-row:last-child { border-bottom: 0; }
      .wsl-endpoint-name { overflow-wrap: anywhere; font-weight: 600; }
      .wsl-path { overflow-wrap: anywhere; margin-top: 3px; color: var(--dsw-alias-label-secondary); font-family: monospace; font-size: 12px; }
      .wsl-role { display: inline-block; margin-top: 2px; padding: 1px 7px; border-radius: 5px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: 11px; white-space: nowrap; }
      .wsl-current-badge { display: inline-block; margin-left: 7px; padding: 0 6px; border: 1px solid var(--dsw-alias-brand-primary); border-radius: 5px; color: var(--dsw-alias-brand-primary); font-size: 10px; font-weight: 500; vertical-align: 1px; }
      .wsl-note { margin: 12px 0 0; padding-top: 10px; border-top: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); white-space: pre-wrap; overflow-wrap: anywhere; }
      .wsl-card-actions { display: flex; flex: none; gap: 6px; }
      .wsl-confirm { margin-top: 14px; padding: 12px; border: 1px solid var(--dsw-alias-state-warn-primary); border-radius: 8px; background: var(--dsw-alias-bg-layer-2); }
      .wsl-confirm-title { margin: 0 0 4px; font-weight: 600; }
      .wsl-confirm-text { margin: 0; color: var(--dsw-alias-label-secondary); }
      .wsl-empty { padding: 42px 24px; border: 1px dashed var(--dsw-alias-border-l2); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); text-align: center; }
      .wsl-empty-icon { display: flex; justify-content: center; margin-bottom: 12px; color: var(--dsw-alias-brand-primary); }
      .wsl-empty-title { margin: 0 0 6px; font-size: 15px; font-weight: 500; }
      .wsl-empty-text { max-width: 560px; margin: 0 auto 16px; color: var(--dsw-alias-label-secondary); }
      @media (max-width: 720px) {
        .wsl-header, .wsl-toolbar { align-items: stretch; flex-direction: column; gap: 10px; }
        .wsl-actions { align-self: flex-start; }
        .wsl-search { max-width: none; }
        .wsl-member-grid { grid-template-columns: 1fr; }
        .wsl-card-top { flex-direction: column; }
        .wsl-card-actions { align-self: flex-end; }
      }
      @media (max-width: 520px) {
        .wsl-member-row { grid-template-columns: 1fr; }
        .wsl-select-row { grid-template-columns: 1fr; }
      }
    `;

    function LinkGlyph({ size = 18 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true', focusable: 'false' },
        h('path', { d: 'm9.5 14.5 5-5M7.2 16.8l-1.1 1.1a3.6 3.6 0 0 1-5-5l3.2-3.2a3.6 3.6 0 0 1 5 0M16.8 7.2l1.1-1.1a3.6 3.6 0 0 1 5 5l-3.2 3.2a3.6 3.6 0 0 1-5 0', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    function errorMessage(reason) {
      if (reason instanceof Error) return reason.message;
      if (reason && typeof reason === 'object' && typeof reason.message === 'string') return reason.message;
      return String(reason || 'Unknown error');
    }

    function relationKey(relation) {
      return JSON.stringify(relation.workspaces.map(item => item.path.toLowerCase()).sort());
    }

    function editorSignature(editor) {
      return JSON.stringify({
        members: editor.members.map(member => ({ path: member.path, name: member.name, role: member.role })),
        description: editor.description,
      });
    }

    function containsPath(parent, candidate) {
      if (typeof candidate !== 'string' || candidate.length === 0) return false;
      const left = parent.replace(/[\\/]+$/, '').toLowerCase();
      const right = candidate.replace(/[\\/]+$/, '').toLowerCase();
      return right === left || right.startsWith(`${left}/`) || right.startsWith(`${left}\\`);
    }

    function TextField({ id, label, value, onChange, placeholder, disabled, inputRef }) {
      return h('div', { className: 'wsl-field' },
        h('label', { className: 'wsl-label', htmlFor: id }, label),
        h('input', { id, ref: inputRef, className: 'wsl-input', type: 'text', value, placeholder, disabled, onChange: event => onChange(event.currentTarget.value) }));
    }

    function WorkspaceField({ id, label, value, workspaces, onChange, onBrowse, disabled, browseLabel, selectLabel, inputRef }) {
      const known = workspaces.some(item => item.path === value);
      return h('div', { className: 'wsl-field' },
        h('label', { className: 'wsl-label', htmlFor: id }, label),
        h('div', { className: 'wsl-select-row' },
          h('select', { id, ref: inputRef, className: 'wsl-select', value, disabled, required: true, onChange: event => onChange(event.currentTarget.value) },
            h('option', { value: '' }, selectLabel),
            !known && value ? h('option', { value }, value) : null,
            workspaces.map(item => h('option', { key: item.id || item.path, value: item.path }, `${item.name} — ${item.path}`))),
          h('button', { type: 'button', className: 'wsl-button', disabled, onClick: onBrowse }, browseLabel)));
    }

    function GroupMember({ item, current, t }) {
      return h('div', { className: 'wsl-member-row' },
        h('div', null,
          h('div', { className: 'wsl-endpoint-name' }, item.name || item.path,
            current ? h('span', { className: 'wsl-current-badge' }, t('current')) : null),
          h('div', { className: 'wsl-path', title: item.path }, item.path)),
        h('span', { className: 'wsl-role' }, item.role || t('rolesMissing')));
    }

    function RelationCard({ relation, currentPath, busy, confirming, canEdit, canRemove, onEdit, onAskRemove, onCancelRemove, onConfirmRemove, editButtonRef, removeButtonRef, t }) {
      const key = relationKey(relation);
      return h('li', { className: 'wsl-card', 'data-relation-key': key },
        h('div', { className: 'wsl-card-top' },
          h('div', { className: 'wsl-card-main' },
            h('div', { className: 'wsl-group-meta' }, t('memberCount', { count: relation.workspaces.length })),
            h('div', { className: 'wsl-card-members' },
              relation.workspaces.map(item => h(GroupMember, {
                key: item.path, item, current: containsPath(item.path, currentPath), t,
              })))),
          canEdit || canRemove ? h('div', { className: 'wsl-card-actions' },
            canEdit ? h('button', { ref: editButtonRef, type: 'button', className: 'wsl-button', disabled: busy, onClick: () => onEdit(relation) }, t('edit')) : null,
            canRemove ? h('button', { ref: removeButtonRef, type: 'button', className: 'wsl-button wsl-button-danger', disabled: busy, onClick: () => onAskRemove(relation) }, t('remove')) : null) : null),
        h('p', { className: 'wsl-note' }, relation.description || t('noteMissing')),
        confirming ? h('div', { className: 'wsl-confirm', role: 'alert' },
          h('h4', { className: 'wsl-confirm-title' }, t('removeTitle')),
          h('p', { className: 'wsl-confirm-text' }, t('removeDescription')),
          h('div', { className: 'wsl-form-actions' },
            h('button', { type: 'button', className: 'wsl-button', disabled: busy, autoFocus: true, onClick: onCancelRemove }, t('cancel')),
            h('button', { type: 'button', className: 'wsl-button wsl-button-danger', disabled: busy, onClick: () => onConfirmRemove(relation) }, busy ? t('removing') : t('confirmRemove')))) : null);
    }

    function WorkspaceLinksPage(props) {
      const { api, pickDirectory, t, useSessions, useRemoteAccess } = props;
      const [relations, setRelations] = React.useState([]);
      const [workspaces, setWorkspaces] = React.useState([]);
      const [loading, setLoading] = React.useState(true);
      const [loadError, setLoadError] = React.useState(null);
      const [formError, setFormError] = React.useState(null);
      const [notice, setNotice] = React.useState(null);
      const [editor, setEditor] = React.useState(null);
      const [confirmKey, setConfirmKey] = React.useState(null);
      const [busy, setBusy] = React.useState(null);
      const [query, setQuery] = React.useState('');
      const requestGeneration = React.useRef(0);
      const firstFieldRef = React.useRef(null);
      const addButtonRef = React.useRef(null);
      const editorRef = React.useRef(null);
      const editorReturnRef = React.useRef(null);
      const removeReturnRef = React.useRef(null);
      const editButtonRefs = React.useRef(new Map());
      const removeButtonRefs = React.useRef(new Map());
      const memberSequence = React.useRef(0);
      const titleId = React.useId();
      const formId = React.useId();
      const searchId = React.useId();
      const currentCwd = useSessions(state => Object.values(state.byId).find(item => (item.retainedBy?.mainView ?? 0) > 0)?.cwd);
      const canWrite = useRemoteAccess('workspaceLinks/save') !== false;
      const canRemove = useRemoteAccess('workspaceLinks/unlink') !== false;
      const currentWorkspace = workspaces
        .filter(item => containsPath(item.path, currentCwd))
        .sort((left, right) => right.path.length - left.path.length)[0];
      const makeMember = (data = {}) => ({
        uid: ++memberSequence.current,
        path: data.path || '',
        name: data.name || '',
        role: data.role || '',
      });

      const load = React.useCallback(async (showLoading = true) => {
        const generation = ++requestGeneration.current;
        if (showLoading) setLoading(true);
        try {
          const value = await api.list();
          if (generation !== requestGeneration.current) return false;
          setRelations(value.relations || []);
          setWorkspaces(value.workspaces || []);
          setLoadError(null);
          return true;
        } catch (reason) {
          if (generation === requestGeneration.current) setLoadError(errorMessage(reason));
          return false;
        } finally {
          if (generation === requestGeneration.current) setLoading(false);
        }
      }, [api]);

      React.useEffect(() => {
        load();
        return () => { requestGeneration.current += 1; };
      }, [load]);

      editorRef.current = editor;

      React.useEffect(() => {
        if (editor) firstFieldRef.current?.focus();
      }, [editor?.key]);

      React.useEffect(() => {
        if (editor !== null || editorReturnRef.current === null) return;
        const target = editorReturnRef.current;
        editorReturnRef.current = null;
        const button = target.type === 'edit' ? editButtonRefs.current.get(target.key) : addButtonRef.current;
        (button?.isConnected ? button : addButtonRef.current)?.focus();
      }, [editor]);

      React.useEffect(() => {
        if (confirmKey !== null || removeReturnRef.current === null) return;
        const button = removeButtonRefs.current.get(removeReturnRef.current);
        removeReturnRef.current = null;
        (button?.isConnected ? button : addButtonRef.current)?.focus();
      }, [confirmKey, relations]);

      const openCreate = () => {
        if (busy) return;
        editorReturnRef.current = { type: 'add' };
        setFormError(null);
        setNotice(null);
        const members = [makeMember(currentWorkspace || {}), makeMember()];
        const description = '';
        setEditor({ key: null, members, description, initial: editorSignature({ members, description }) });
      };
      const openEdit = relation => {
        if (busy) return;
        editorReturnRef.current = { type: 'edit', key: relationKey(relation) };
        setFormError(null);
        setNotice(null);
        setConfirmKey(null);
        const members = relation.workspaces.map(item => makeMember(item));
        const description = relation.description || '';
        setEditor({ key: relationKey(relation), members, description, initial: editorSignature({ members, description }) });
      };
      const askRemove = relation => {
        if (busy) return;
        removeReturnRef.current = relationKey(relation);
        setConfirmKey(relationKey(relation));
        setNotice(null);
      };
      const goBack = () => {
        if (busy) return;
        const current = editorRef.current;
        if (!current) return;
        if (editorSignature(current) !== current.initial && !window.confirm(t('discardConfirm'))) return;
        setEditor(null);
        setFormError(null);
      };
      const updateMember = (index, field, value) => {
        setEditor(current => {
          if (!current || !current.members[index]) return current;
          const members = current.members.slice();
          members[index] = { ...members[index], [field]: value };
          return { ...current, members };
        });
      };
      const addMember = () => {
        const member = makeMember();
        setEditor(current => {
          if (!current || current.members.length >= MAX_GROUP_MEMBERS) return current;
          return { ...current, members: [...current.members, member] };
        });
      };
      const removeMember = index => {
        setEditor(current => {
          if (!current || current.members.length <= 2) return current;
          return { ...current, members: current.members.filter((_member, memberIndex) => memberIndex !== index) };
        });
      };
      const browseMember = async (index, field) => {
        const target = editorRef.current;
        const targetMember = target?.members[index];
        if (!target || !targetMember || busy) return;
        try {
          const selected = await pickDirectory();
          if (!selected || editorRef.current !== target) return;
          setEditor(current => {
            if (current !== target) return current;
            return {
              ...current,
              members: current.members.map(member => member.uid === targetMember.uid ? { ...member, [field]: selected } : member),
            };
          });
        } catch (reason) {
          if (editorRef.current === target) setFormError(t('browseFailed', { message: errorMessage(reason) }));
        }
      };
      const save = async event => {
        event.preventDefault();
        const active = editorRef.current;
        if (!active || busy) return;
        if (active.members.length < 2) { setFormError(t('requiredPath')); return; }
        if (active.members.length > MAX_GROUP_MEMBERS) { setFormError(t('groupHelp', { max: MAX_GROUP_MEMBERS })); return; }
        if (active.members.some(member => !member.path)) { setFormError(t('requiredPath')); return; }
        const paths = active.members.map(member => member.path.trim().toLowerCase());
        if (new Set(paths).size !== paths.length) { setFormError(t('samePath')); return; }
        setBusy('save');
        setFormError(null);
        setNotice(null);
        try {
          const result = await api.save({
            members: active.members.map(member => ({ path: member.path, name: member.name, role: member.role })),
            description: active.description,
            ...active.key ? { originalKey: active.key } : {},
          });
          const refreshed = await load(false);
          setEditor(current => current === active ? null : current);
          setNotice(refreshed
            ? { tone: 'success', text: t(result.action === 'created' ? 'created' : 'updated') }
            : { tone: 'warn', text: t('savedRefreshFailed') });
        } catch (reason) {
          if (editorRef.current === active) setFormError(t('saveFailed', { message: errorMessage(reason) }));
          else setNotice({ tone: 'error', text: t('saveFailed', { message: errorMessage(reason) }) });
        } finally {
          setBusy(null);
        }
      };
      const remove = async relation => {
        const key = relationKey(relation);
        if (busy) return;
        setBusy(key);
        setNotice(null);
        try {
          const result = await api.unlink({ paths: relation.workspaces.map(item => item.path) });
          const refreshed = await load(false);
          setConfirmKey(null);
          setNotice(refreshed
            ? { tone: 'success', text: t(result.status === 'removed' ? 'removed' : 'notFound') }
            : { tone: 'warn', text: t('savedRefreshFailedRemove') });
        } catch (reason) {
          setNotice({ tone: 'error', text: t('removeFailed', { message: errorMessage(reason) }) });
        } finally {
          setBusy(null);
        }
      };

      const normalizedQuery = query.trim().toLocaleLowerCase();
      const filtered = normalizedQuery
        ? relations.filter(relation => [...relation.workspaces.flatMap(item => [item.name, item.path, item.role]), relation.description]
          .filter(Boolean).some(value => value.toLocaleLowerCase().includes(normalizedQuery)))
        : relations;
      const readonlyText = !canWrite && !canRemove
        ? t('readonly')
        : !canWrite ? t('readonlySave') : t('readonlyRemove');

      return h('section', { className: 'wsl-page', 'aria-labelledby': titleId },
        h('style', null, styles),
        h('div', { className: 'wsl-header' },
          h('div', null,
            h('h2', { className: 'wsl-heading', id: titleId }, t('title')),
            h('p', { className: 'wsl-description' }, t('description')),
            currentWorkspace ? h('p', { className: 'wsl-current' }, `${t('current')}: ${currentWorkspace.name} — ${currentWorkspace.path}`) : null),
          h('div', { className: 'wsl-actions' },
            h('button', { type: 'button', className: 'wsl-button', disabled: loading || busy !== null, onClick: () => load() }, loading ? t('refreshing') : t('refresh')),
            editor && canWrite ? h('button', { type: 'button', className: 'wsl-button', disabled: busy !== null, onClick: goBack }, t('back')) : null,
            canWrite && !editor ? h('button', { ref: addButtonRef, type: 'button', className: 'wsl-button wsl-button-primary', disabled: busy !== null, onClick: openCreate }, t('add')) : null)),
        !canWrite || !canRemove ? h('div', { className: 'wsl-notice', role: 'status' }, readonlyText) : null,
        notice ? h('div', { className: `wsl-notice wsl-notice-${notice.tone}`, role: notice.tone === 'error' ? 'alert' : 'status', 'aria-live': notice.tone === 'error' ? 'assertive' : 'polite', 'aria-atomic': 'true' }, notice.text) : null,
        loadError ? h('div', { className: 'wsl-notice wsl-notice-error', role: 'alert' }, t('loadFailed', { message: loadError })) : null,
        editor && canWrite ? h('form', { className: 'wsl-panel', onSubmit: save, 'aria-labelledby': `${formId}-title`, 'aria-busy': busy === 'save' },
          h('div', { className: 'wsl-panel-head' },
            h('h3', { className: 'wsl-panel-title', id: `${formId}-title` }, t(editor.key ? 'editTitle' : 'createTitle'))),
          h('div', { className: 'wsl-members' },
            editor.members.map((member, index) => h('div', {
              className: 'wsl-member', key: member.uid, role: 'group', 'aria-labelledby': `${formId}-member-${index}`,
            },
              h('div', { className: 'wsl-member-head' },
                h('h4', { className: 'wsl-member-title', id: `${formId}-member-${index}` }, t('memberLabel', { index: index + 1 })),
                editor.members.length > 2 ? h('button', { type: 'button', className: 'wsl-button wsl-button-small wsl-button-danger', disabled: busy !== null, onClick: () => removeMember(index) }, t('removeMember')) : null),
              h(WorkspaceField, {
                id: `${formId}-path-${index}`, label: t('workspacePath'), value: member.path, workspaces, disabled: busy !== null,
                onChange: value => updateMember(index, 'path', value),
                onBrowse: () => browseMember(index, 'path'),
                browseLabel: t('browse'), selectLabel: t('selectWorkspace'),
                inputRef: index === 0 ? firstFieldRef : undefined,
              }),
              h('div', { className: 'wsl-member-grid' },
                h(TextField, {
                  id: `${formId}-name-${index}`, label: t('name'), value: member.name, disabled: busy !== null,
                  placeholder: t('namePlaceholder'), onChange: value => updateMember(index, 'name', value),
                }),
                h(TextField, {
                  id: `${formId}-role-${index}`, label: t('role'), value: member.role, disabled: busy !== null,
                  placeholder: t('rolePlaceholder'), onChange: value => updateMember(index, 'role', value),
                }))))),
          h('button', { type: 'button', className: 'wsl-button wsl-add-member', disabled: busy !== null || editor.members.length >= MAX_GROUP_MEMBERS, onClick: addMember }, t('addMember')),
          h('div', { className: 'wsl-field', style: { marginTop: '12px' } },
            h('label', { className: 'wsl-label', htmlFor: `${formId}-note` }, t('note')),
            h('textarea', { id: `${formId}-note`, className: 'wsl-textarea', value: editor.description, disabled: busy !== null, placeholder: t('notePlaceholder'), onChange: event => { const value = event.currentTarget.value; setEditor(current => current ? { ...current, description: value } : current); } })),
          h('p', { className: 'wsl-help' }, t('groupHelp', { max: MAX_GROUP_MEMBERS })),
          formError ? h('div', { className: 'wsl-notice wsl-notice-error', role: 'alert', style: { marginTop: '12px', marginBottom: 0 } }, formError) : null,
          h('div', { className: 'wsl-form-actions' },
            h('button', { type: 'button', className: 'wsl-button', disabled: busy !== null, onClick: goBack }, t('cancel')),
            h('button', { type: 'submit', className: 'wsl-button wsl-button-primary', disabled: busy !== null }, busy === 'save' ? t('saving') : t('save')))) : null,
        h('div', { className: 'wsl-toolbar' },
          h('div', { className: 'wsl-search' },
            h('label', { className: 'wsl-label', htmlFor: searchId }, t('searchLabel')),
            h('input', { id: searchId, className: 'wsl-input', type: 'search', value: query, placeholder: t('searchPlaceholder'), autoComplete: 'off', onChange: event => setQuery(event.currentTarget.value) })),
          h('p', { className: 'wsl-count', role: 'status', 'aria-live': 'polite' }, t(normalizedQuery ? 'filteredCount' : 'count', { shown: filtered.length, total: relations.length }))),
        loading ? h('div', { className: 'wsl-empty', role: 'status' }, t('loading'))
          : filtered.length === 0 ? h('div', { className: 'wsl-empty' },
            h('div', { className: 'wsl-empty-icon' }, h(LinkGlyph, { size: 32 })),
            h('h3', { className: 'wsl-empty-title' }, t(relations.length === 0 ? 'emptyTitle' : 'noMatches')),
            h('p', { className: 'wsl-empty-text' }, relations.length === 0 ? t('emptyDescription') : ''),
            relations.length === 0 && canWrite ? h('button', { type: 'button', className: 'wsl-button wsl-button-primary', disabled: busy !== null, onClick: openCreate }, t('addFirst')) : null)
            : h('ul', { className: 'wsl-list', 'aria-label': t('resultsLabel'), 'aria-busy': busy !== null },
              filtered.map(relation => h(RelationCard, {
                key: relationKey(relation), relation, currentPath: currentWorkspace?.path || currentCwd || '', busy: busy !== null,
                confirming: confirmKey === relationKey(relation), canEdit: canWrite, canRemove,
                editButtonRef: node => {
                  if (node) editButtonRefs.current.set(relationKey(relation), node);
                  else editButtonRefs.current.delete(relationKey(relation));
                },
                removeButtonRef: node => {
                  if (node) removeButtonRefs.current.set(relationKey(relation), node);
                  else removeButtonRefs.current.delete(relationKey(relation));
                },
                onEdit: openEdit, onAskRemove: askRemove,
                onCancelRemove: () => setConfirmKey(null), onConfirmRemove: remove, t,
              }))));
    }

    function SettingsLinkIcon({ size = 16 }) {
      return h(LinkGlyph, { size });
    }

    function createApi(ctx, getMountError) {
      const call = async (method, request) => {
        const namespace = ctx.remote.namespaces.get(NAMESPACE)?.service;
        const fn = namespace?.[method];
        if (typeof fn !== 'function') throw getMountError() ?? new Error(`workspaceLinks Remote method "${method}" is not mounted`);
        const rpc = await fn(request);
        if (!rpc || rpc.ok !== true) throw new Error(rpc?.error?.message || `workspaceLinks Remote call "${method}" failed`);
        return rpc.value;
      };
      return {
        list: () => call('list', {}),
        save: request => call('save', request),
        unlink: request => call('unlink', request),
      };
    }

    return {
      inject: ['remote', 'slots', 'locale', 'uiWorkspace'],
      async apply(ctx) {
        let mountError = null;
        try {
          const disposeMount = await ctx.remote.$mount(REMOTE);
          ctx.effect(() => disposeMount, 'workspace-links.remote');
        } catch (reason) {
          mountError = reason instanceof Error ? reason : new Error(String(reason));
          console.error('[workspace-links] Remote mount failed', reason);
        }
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'workspace-links.dictionaries');
        const t = ctx.locale.bind(NS);
        const api = createApi(ctx, () => mountError);
        const injected = () => ({ api, pickDirectory: () => ctx.uiWorkspace.pickDirectory(), t });
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section', id: SECTION_ID, order: 24, label: () => t('nav'), locale: NS, inject: injected,
        }, WorkspaceLinksPage));
        ctx.slots.inject('settings.section.icon', () => ctx.slots.register({
          name: 'settings.section.icon', id: SECTION_ID,
        }, SettingsLinkIcon));
      },
    };
  },
});
