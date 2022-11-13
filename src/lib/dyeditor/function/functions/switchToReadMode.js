export default function switchToReadMode(editor) {
    editor.enableReadOnlyMode(editor.id);
    const editorView = editor.ui.view.element;
    const toolbar = editorView.firstChild;
    toolbar.remove();
}