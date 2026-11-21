window.__ModuleLoader__.load({
  id: 'dsh-workspace-links',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'workspace-links';
    const SECTION_ID = 'workspace-links';
    const PACKAGE = 'dsh-workspace-links';
    const NAMESPACE = 'workspaceLinks';

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
      description: '把前端、后端和其他相关项目连接起来。保存后，AI 会在对应工作区中自动获得对方的名称、路径、角色和备注。',
      current: '当前工作区', add: '新建关联', addFirst: '新建第一组关联', refresh: '刷新', refreshing: '正在刷新…',
      createTitle: '新建工作区关联', editTitle: '编辑工作区关联', workspaceA: '工作区 A', workspaceB: '工作区 B',
      selectWorkspace: '请选择工作区', browse: '选择目录…', nameA: 'A 的显示名称', nameB: 'B 的显示名称',
      roleA: 'A 的项目角色', roleB: 'B 的项目角色', namePlaceholder: '默认使用工作区标题',
      roleAPlaceholder: '例如：Vue 前端', roleBPlaceholder: '例如：Spring Boot 后端', note: '协作备注',
      notePlaceholder: '例如：前后端共用 API 契约，修改接口时同步检查两边。', pathsLocked: '编辑时目录不可更改；如需更换目录，请新建关联后解除旧关联。',
      save: '保存关联', saving: '正在保存…', cancel: '取消', edit: '编辑', remove: '解除关联',
      removeTitle: '确认解除关联', removeDescription: '只删除这组关联，不会删除工作区、会话或任何项目文件。', confirmRemove: '确认解除', removing: '正在解除…',
      created: '关联已创建，AI 后续请求会自动获得这组项目上下文。', updated: '关联已更新。', removed: '关联已解除；工作区和项目文件均未改动。',
      notFound: '这组关联已经不存在，列表已刷新。', saveFailed: '保存关联失败：{message}', removeFailed: '解除关联失败：{message}',
      loadFailed: '读取工作区关联失败：{message}', browseFailed: '选择目录失败：{message}', samePath: '两个工作区不能是同一个目录。',
      requiredPath: '请先选择两个工作区。', emptyTitle: '还没有工作区关联', emptyDescription: '将前端、后端或其他相关项目连接起来，之后无需再向 AI 重复提供项目路径。',
      noMatches: '没有匹配的关联', resultsLabel: '工作区关联列表', count: '共 {total} 组关联', filteredCount: '显示 {shown} / {total} 组关联',
      searchLabel: '搜索关联', searchPlaceholder: '名称、路径、角色或备注', clearSearch: '清空搜索', loading: '正在读取工作区关联…',
      readonly: '当前身份只能查看关联，不能修改。', readonlySave: '当前身份不能新建或编辑关联，但可以解除已有关系。', readonlyRemove: '当前身份不能解除关联，但可以新建或编辑关系。',
      savedRefreshFailed: '关联已保存，但列表刷新失败；请点击“刷新”查看最新状态。', savedRefreshFailedRemove: '关联已解除，但列表刷新失败；请点击“刷新”查看最新状态。',
      rolesMissing: '未设置项目角色', noteMissing: '未填写协作备注',
    };
    const en = {
      nav: 'Workspace links', title: 'Workspace links',
      description: 'Connect frontend, backend, and other related projects. Once saved, agents automatically see each workspace’s name, path, role, and notes.',
      current: 'Current workspace', add: 'New link', addFirst: 'Create your first link', refresh: 'Refresh', refreshing: 'Refreshing…',
      createTitle: 'New workspace link', editTitle: 'Edit workspace link', workspaceA: 'Workspace A', workspaceB: 'Workspace B',
      selectWorkspace: 'Select a workspace', browse: 'Choose directory…', nameA: 'Display name for A', nameB: 'Display name for B',
      roleA: 'Role of project A', roleB: 'Role of project B', namePlaceholder: 'Defaults to the workspace title',
      roleAPlaceholder: 'For example: Vue frontend', roleBPlaceholder: 'For example: Spring Boot backend', note: 'Collaboration notes',
      notePlaceholder: 'For example: both projects share an API contract and must be checked together.', pathsLocked: 'Paths cannot change while editing. Create a new link and remove the old one to change directories.',
      save: 'Save link', saving: 'Saving…', cancel: 'Cancel', edit: 'Edit', remove: 'Unlink',
      removeTitle: 'Unlink these workspaces?', removeDescription: 'Only this relationship is removed. Workspaces, sessions, and project files are not deleted.', confirmRemove: 'Unlink', removing: 'Unlinking…',
      created: 'Link created. Agents will see this project context in subsequent requests.', updated: 'Link updated.', removed: 'Link removed. Workspaces and project files were not changed.',
      notFound: 'This link no longer exists. The list has been refreshed.', saveFailed: 'Could not save the link: {message}', removeFailed: 'Could not unlink: {message}',
      loadFailed: 'Could not load workspace links: {message}', browseFailed: 'Could not choose a directory: {message}', samePath: 'Choose two different workspace directories.',
      requiredPath: 'Choose both workspaces first.', emptyTitle: 'No workspace links yet', emptyDescription: 'Connect frontend, backend, or other related projects so you no longer need to repeat their paths to agents.',
      noMatches: 'No matching links', resultsLabel: 'Workspace link list', count: '{total} links', filteredCount: 'Showing {shown} of {total} links',
      searchLabel: 'Search links', searchPlaceholder: 'Name, path, role, or notes', clearSearch: 'Clear search', loading: 'Loading workspace links…',
      readonly: 'Your current identity can view links but cannot change them.', readonlySave: 'Your current identity cannot create or edit links, but can unlink existing ones.', readonlyRemove: 'Your current identity cannot unlink, but can create or edit links.',
      savedRefreshFailed: 'The link was saved, but refreshing the list failed. Choose Refresh to see the latest state.', savedRefreshFailedRemove: 'The link was removed, but refreshing the list failed. Choose Refresh to see the latest state.',
      rolesMissing: 'No project role set', noteMissing: 'No collaboration notes',
    };

    const styles = `
      .wsl-page { width: 100%; max-width: 980px; color: var(--dsw-alias-label-primary); font-size: 14px; line-height: 1.55; }
      .wsl-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
      .wsl-heading { margin: 3px 0 5px; font-size: 21px; line-height: 29px; font-weight: 600; }
      .wsl-description { max-width: 700px; margin: 0; color: var(--dsw-alias-label-secondary); }
      .wsl-current { margin: 8px 0 0; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .wsl-actions { display: flex; flex: none; gap: 8px; }
      .wsl-button { min-height: 34px; padding: 6px 13px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer; }
      .wsl-button:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-brand-primary); }
      .wsl-button:disabled { cursor: not-allowed; opacity: 0.55; }
      .wsl-button-primary { border-color: var(--dsw-alias-label-primary); background: var(--dsw-alias-label-primary); color: var(--dsw-alias-bg-base); }
      .wsl-button-primary:hover:not(:disabled) { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-label-primary); color: var(--dsw-alias-bg-base); }
      .wsl-button-danger { color: var(--dsw-alias-state-error-primary); }
      .wsl-button:focus-visible, .wsl-input:focus, .wsl-select:focus, .wsl-textarea:focus { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .wsl-panel { margin-bottom: 16px; padding: 18px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); }
      .wsl-panel-title { margin: 0 0 14px; font-size: 16px; line-height: 22px; font-weight: 600; }
      .wsl-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; }
      .wsl-field { min-width: 0; }
      .wsl-field-full { grid-column: 1 / -1; }
      .wsl-label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500; }
      .wsl-select-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }
      .wsl-select-row .wsl-button { white-space: nowrap; }
      .wsl-select, .wsl-input, .wsl-textarea { box-sizing: border-box; width: 100%; min-width: 0; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font: inherit; }
      .wsl-select, .wsl-input { height: 38px; padding: 0 10px; }
      .wsl-textarea { min-height: 86px; padding: 9px 10px; resize: vertical; }
      .wsl-select:disabled, .wsl-input:disabled, .wsl-textarea:disabled { opacity: 0.65; }
      .wsl-input::placeholder, .wsl-textarea::placeholder { color: var(--dsw-alias-label-secondary); opacity: 0.75; }
      .wsl-help { margin: 6px 0 0; color: var(--dsw-alias-label-secondary); font-size: 12px; }
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
      .wsl-pair { display: grid; grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr); align-items: start; flex: 1; min-width: 0; gap: 8px; }
      .wsl-endpoint { min-width: 0; }
      .wsl-endpoint-name { overflow-wrap: anywhere; font-weight: 600; }
      .wsl-path { overflow-wrap: anywhere; margin-top: 3px; color: var(--dsw-alias-label-secondary); font-family: monospace; font-size: 12px; }
      .wsl-role { display: inline-block; margin-top: 7px; padding: 1px 7px; border-radius: 5px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .wsl-current-badge { display: inline-block; margin-left: 7px; padding: 0 6px; border: 1px solid var(--dsw-alias-brand-primary); border-radius: 5px; color: var(--dsw-alias-brand-primary); font-size: 10px; font-weight: 500; vertical-align: 1px; }
      .wsl-link-icon { display: flex; justify-content: center; padding-top: 3px; color: var(--dsw-alias-brand-primary); }
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
        .wsl-form-grid { grid-template-columns: 1fr; }
        .wsl-card-top { flex-direction: column; }
        .wsl-card-actions { align-self: flex-end; }
      }
      @media (max-width: 520px) {
        .wsl-pair { grid-template-columns: 1fr; }
        .wsl-link-icon { justify-content: flex-start; transform: rotate(90deg); }
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

    function Endpoint({ item, current, t }) {
      return h('div', { className: 'wsl-endpoint' },
        h('div', { className: 'wsl-endpoint-name' }, item.name || item.path,
          current ? h('span', { className: 'wsl-current-badge' }, t('current')) : null),
        h('div', { className: 'wsl-path', title: item.path }, item.path),
        h('span', { className: 'wsl-role' }, item.role || t('rolesMissing')));
    }

    function RelationCard({ relation, currentPath, busy, confirming, canEdit, canRemove, onEdit, onAskRemove, onCancelRemove, onConfirmRemove, editButtonRef, removeButtonRef, t }) {
      const key = relationKey(relation);
      const [a, b] = relation.workspaces;
      return h('li', { className: 'wsl-card', 'data-relation-key': key },
        h('div', { className: 'wsl-card-top' },
          h('div', { className: 'wsl-pair' },
            h(Endpoint, { item: a, current: containsPath(a.path, currentPath), t }),
            h('span', { className: 'wsl-link-icon' }, h(LinkGlyph, { size: 18 })),
            h(Endpoint, { item: b, current: containsPath(b.path, currentPath), t })),
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
      const titleId = React.useId();
      const formId = React.useId();
      const searchId = React.useId();
      const currentCwd = useSessions(state => Object.values(state.byId).find(item => (item.retainedBy?.mainView ?? 0) > 0)?.cwd);
      const canWrite = useRemoteAccess('workspaceLinks/save') !== false;
      const canRemove = useRemoteAccess('workspaceLinks/unlink') !== false;
      const currentWorkspace = workspaces
        .filter(item => containsPath(item.path, currentCwd))
        .sort((left, right) => right.path.length - left.path.length)[0];

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
        setEditor({
          key: null,
          aPath: currentWorkspace?.path || '', bPath: '',
          aName: currentWorkspace?.name || '', bName: '', aRole: '', bRole: '', description: '',
        });
      };
      const openEdit = relation => {
        if (busy) return;
        const [a, b] = relation.workspaces;
        editorReturnRef.current = { type: 'edit', key: relationKey(relation) };
        setFormError(null);
        setNotice(null);
        setConfirmKey(null);
        setEditor({
          key: relationKey(relation), aPath: a.path, bPath: b.path,
          aName: a.name || '', bName: b.name || '', aRole: a.role || '', bRole: b.role || '', description: relation.description || '',
        });
      };
      const askRemove = relation => {
        if (busy) return;
        removeReturnRef.current = relationKey(relation);
        setConfirmKey(relationKey(relation));
        setNotice(null);
      };
      const updateEditor = (field, value) => { setEditor(current => ({ ...current, [field]: value })); };
      const browse = async field => {
        const target = editorRef.current;
        if (!target || busy) return;
        try {
          const selected = await pickDirectory();
          if (!selected || editorRef.current !== target) return;
          setEditor(current => current === target ? { ...current, [field]: selected } : current);
        } catch (reason) {
          if (editorRef.current === target) setFormError(t('browseFailed', { message: errorMessage(reason) }));
        }
      };
      const save = async event => {
        event.preventDefault();
        const active = editorRef.current;
        if (!active || busy) return;
        if (!active.aPath || !active.bPath) { setFormError(t('requiredPath')); return; }
        if (active.aPath.toLowerCase() === active.bPath.toLowerCase()) { setFormError(t('samePath')); return; }
        setBusy('save');
        setFormError(null);
        setNotice(null);
        try {
          const result = await api.save({
            aPath: active.aPath, bPath: active.bPath,
            aName: active.aName, bName: active.bName, aRole: active.aRole, bRole: active.bRole, description: active.description,
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
          const result = await api.unlink({ aPath: relation.workspaces[0].path, bPath: relation.workspaces[1].path });
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
            canWrite && !editor ? h('button', { ref: addButtonRef, type: 'button', className: 'wsl-button wsl-button-primary', disabled: busy !== null, onClick: openCreate }, t('add')) : null)),
        !canWrite || !canRemove ? h('div', { className: 'wsl-notice', role: 'status' }, readonlyText) : null,
        notice ? h('div', { className: `wsl-notice wsl-notice-${notice.tone}`, role: notice.tone === 'error' ? 'alert' : 'status', 'aria-live': notice.tone === 'error' ? 'assertive' : 'polite', 'aria-atomic': 'true' }, notice.text) : null,
        loadError ? h('div', { className: 'wsl-notice wsl-notice-error', role: 'alert' }, t('loadFailed', { message: loadError })) : null,
        editor && canWrite ? h('form', { className: 'wsl-panel', onSubmit: save, 'aria-labelledby': `${formId}-title`, 'aria-busy': busy === 'save' },
          h('h3', { className: 'wsl-panel-title', id: `${formId}-title` }, t(editor.key ? 'editTitle' : 'createTitle')),
          h('div', { className: 'wsl-form-grid' },
            h(WorkspaceField, { id: `${formId}-a`, label: t('workspaceA'), value: editor.aPath, workspaces, disabled: busy !== null || Boolean(editor.key), onChange: value => updateEditor('aPath', value), onBrowse: () => browse('aPath'), browseLabel: t('browse'), selectLabel: t('selectWorkspace'), inputRef: editor.key ? undefined : firstFieldRef }),
            h(WorkspaceField, { id: `${formId}-b`, label: t('workspaceB'), value: editor.bPath, workspaces, disabled: busy !== null || Boolean(editor.key), onChange: value => updateEditor('bPath', value), onBrowse: () => browse('bPath'), browseLabel: t('browse'), selectLabel: t('selectWorkspace') }),
            h(TextField, { id: `${formId}-an`, label: t('nameA'), value: editor.aName, disabled: busy !== null, placeholder: t('namePlaceholder'), inputRef: editor.key ? firstFieldRef : undefined, onChange: value => updateEditor('aName', value) }),
            h(TextField, { id: `${formId}-bn`, label: t('nameB'), value: editor.bName, disabled: busy !== null, placeholder: t('namePlaceholder'), onChange: value => updateEditor('bName', value) }),
            h(TextField, { id: `${formId}-ar`, label: t('roleA'), value: editor.aRole, disabled: busy !== null, placeholder: t('roleAPlaceholder'), onChange: value => updateEditor('aRole', value) }),
            h(TextField, { id: `${formId}-br`, label: t('roleB'), value: editor.bRole, disabled: busy !== null, placeholder: t('roleBPlaceholder'), onChange: value => updateEditor('bRole', value) }),
            h('div', { className: 'wsl-field wsl-field-full' },
              h('label', { className: 'wsl-label', htmlFor: `${formId}-note` }, t('note')),
              h('textarea', { id: `${formId}-note`, className: 'wsl-textarea', value: editor.description, disabled: busy !== null, placeholder: t('notePlaceholder'), onChange: event => updateEditor('description', event.currentTarget.value) }))),
          editor.key ? h('p', { className: 'wsl-help' }, t('pathsLocked')) : null,
          formError ? h('div', { className: 'wsl-notice wsl-notice-error', role: 'alert', style: { marginTop: '12px', marginBottom: 0 } }, formError) : null,
          h('div', { className: 'wsl-form-actions' },
            h('button', { type: 'button', className: 'wsl-button', disabled: busy !== null, onClick: () => { if (busy) return; setEditor(null); setFormError(null); } }, t('cancel')),
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
