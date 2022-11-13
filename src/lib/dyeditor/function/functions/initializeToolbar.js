export default function initializeToolbar(_editor, style) {
    const editorEl = _editor.ui.view.element;
    initialize(_editor);
    for(const _style in style)
        editorEl.style[_style] = style[_style];
    function responsive() {
        if(editorEl.offsetWidth === 0)
            window.removeEventListener('resize', responsive);
        switch (changeState(editorEl.offsetWidth)) {
            case CHANGE.NONE:
                console.log('NONE');
                break;
            case CHANGE.S:
                console.log('SMALL');
                changeToSmallToolbar();
                break;
            case CHANGE.M:
                console.log('MIDDLE');
                changeToMiddleToolbar();
                break;
            case CHANGE.L:
                console.log('LARGE');
                changeToLargeToolbar();
                break;
            case CHANGE.XL:
                console.log('EXTRA LARGE');
                changeToExtraLargeToolbar(_editor);
                break;
            default:
                console.error("The size of the editor does not correspond anywhere.")
                break;
        }
    }
    const resizeObserver = new ResizeObserver(() => {
        responsive();
    });
    resizeObserver.observe(editorEl);
}

function initialize(_editor) {
    const editorEl = _editor.ui.view.element;
    editorEl.style.display = "inline-block";

    const toolbar = _editor.ui.view.toolbar;
    let idx = 0;
    for(const item of toolbar.items._itemMap) {
        ELEMENTS[idx] = item[1].element;
        idx += 1;
    }
    editorEl.removeChild(editorEl.firstChild);
    const editorToolbar = editorEl.firstChild;
    editorToolbar.style.border = "1px solid #ccced1";
    while(editorToolbar.firstChild) 
        editorToolbar.removeChild(editorToolbar.firstChild);
    
    for(const group of grouping(ELEMENTS))
        editorToolbar.appendChild(group);
    
    const textBox = editorEl.lastChild;
    textBox.style.border = "1px solid #ccced1";
    textBox.firstChild.style.border = "0";
}
let state;
function changeState(toolbarSize) {
    let _state = state;
    if(toolbarSize === 0) {
        state = CHANGE.NONE;
        return CHANGE.NONE;
    }
    if(toolbarSize <= BORDER.S) {
        state = CHANGE.S;
        if(_state !== state) return state;
        return CHANGE.NONE;
    }
    if(toolbarSize <= BORDER.M) {
        state = CHANGE.M;
        if(_state !== state) return state;
        return CHANGE.NONE;
    }
    if(toolbarSize <= BORDER.L) {
        state = CHANGE.L;
        if(_state !== state) return state;
        return CHANGE.NONE;
    }
    state = CHANGE.XL;
    if(_state !== state) return state;
    return CHANGE.NONE;
}

const BORDER = {
    S: 610,
    M: 740,
    L: 820,
}
const CHANGE = {
    NONE: 0,
    S: 1,
    M: 2,
    L: 3,
    XL: 4,
}

function changeToSmallToolbar() {

}

function changeToMiddleToolbar() {

}

function changeToLargeToolbar() {

}

function changeToExtraLargeToolbar() {
}

const ELEMENTS = new Array(20);
const ELEMENT_NAME = {
    paragraph: 0,
    bar1: 1,
    textAlign: 2,
    fontFamily: 3,
    fontSize: 4,
    bold: 5,
    italic: 6,
    underline: 7,
    strikethrough: 8,
    color: 9,
    backgroundColor: 10,
    bar2: 11,
    link: 12,
    image: 13,
    media: 14,
    table: 15,
    bar3: 16,
    subscript: 17,
    superscript: 18,
    specialCharacter: 19,
}
const GROUPS = new Array(4);
const GROUP_NAME = {
    context: 0,
    text: 1,
    media: 2,
    character:3,
}
function grouping(_ELEMENTS) {
    const group = document.createElement('span');
    // group.style.border = "1px solid #ccced1";
    // group.style.borderRadius = "2px";
    group.style.borderLeft = "1px solid #ccced1";
    group.style.paddingTop = "7px";
    group.style.paddingBottom = "9px";
    GROUPS[GROUP_NAME.context] = group;
    GROUPS[GROUP_NAME.text] = group.cloneNode(true);
    GROUPS[GROUP_NAME.media] = group.cloneNode(true);
    GROUPS[GROUP_NAME.character] = group.cloneNode(true);
    GROUPS[GROUP_NAME.context].style.borderLeft = "0px";

    GROUPS[GROUP_NAME.context].appendChild(_ELEMENTS[ELEMENT_NAME.paragraph]);

    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.textAlign]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.fontFamily]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.fontSize]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.bold]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.italic]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.underline]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.strikethrough]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.color]);
    GROUPS[GROUP_NAME.text].appendChild(_ELEMENTS[ELEMENT_NAME.backgroundColor]);

    GROUPS[GROUP_NAME.media].appendChild(_ELEMENTS[ELEMENT_NAME.link]);
    GROUPS[GROUP_NAME.media].appendChild(_ELEMENTS[ELEMENT_NAME.image]);
    GROUPS[GROUP_NAME.media].appendChild(_ELEMENTS[ELEMENT_NAME.media]);
    GROUPS[GROUP_NAME.media].appendChild(_ELEMENTS[ELEMENT_NAME.table]);

    GROUPS[GROUP_NAME.character].appendChild(_ELEMENTS[ELEMENT_NAME.subscript]);
    GROUPS[GROUP_NAME.character].appendChild(_ELEMENTS[ELEMENT_NAME.superscript]);
    GROUPS[GROUP_NAME.character].appendChild(_ELEMENTS[ELEMENT_NAME.specialCharacter]);

    return GROUPS;
}
export function removeImageUploadElement() {
    ELEMENTS[ELEMENT_NAME.image].style.display = 'none';
}