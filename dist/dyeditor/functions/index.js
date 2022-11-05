export function dataURLtoFile(dataurl, fileName) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, {
    type: mime
  });
}
export function isBase64Image(imgEl) {
  const imgSrc = imgEl.src;
  if (imgSrc.substr(0, 11) === "data:image/") {
    const idx = imgSrc.indexOf(';');
    if (idx === -1) return false;
    if (imgSrc.substr(idx + 1, 6) === "base64") return true;
  }
  return false;
}
export function removeImageUploadElement(editor) {
  for (const imgUpload of editor.ui.view.toolbar.element.getElementsByClassName('ck-file-dialog-button')) {
    imgUpload.style.display = 'None';
  }
}
export function switchToReadMode(editor) {
  editor.enableReadOnlyMode(editor.id);
  editor.ui.view.toolbar.element.style.display = 'none';
}