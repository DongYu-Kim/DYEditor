import React, { useEffect, useRef } from 'react';
import ClassicEditor from './ckeditor/ckeditor';
import { switchToReadMode, removeImageUploadElement, dataURLtoFile, isBase64Image } from './functions';


export default function DYEditor ({data, readOnly, imageUploader}) {
    const DYEditorEl = useRef();
    useEffect(() => {
        if(DYEditorEl.state === undefined) {
            ClassicEditor.create(DYEditorEl.current)
            .then(editor => {
                _editor = editor;
                _editor.setData(data);
                if(imageUploader === undefined) removeImageUploadElement(_editor);
                else{
                    if(typeof imageUploader === 'function') setUploadImages(_editor, imageUploader);
                }
                if(readOnly) switchToReadMode(_editor);
                getData = () => _editor.getData();
            })
            .catch(err => console.error(err));
        }
        DYEditorEl.state = true;
    })
    if(data === undefined || data === null) data = "";
    if(typeof data !== "string") console.error("data must be a string.")
    if(readOnly === undefined) readOnly = false;
    if(typeof readOnly !== "boolean") console.error("readOnly must be a boolean")
    
    return <span ref={DYEditorEl} />
}


let _editor = null;
export let getData = null;
export let uploadImages = null; // If not called, the Base64 upload method is used.
function setUploadImages(_editor, imageUploader) {
    uploadImages = () => {
        const promises = [];
        let _data = _editor.getData();
        const _getData = () => (() => _data)();
        const _setData = (data) => _data = data;
        for(const imgEl of _editor.ui.element.getElementsByTagName('img')) {
            if(isBase64Image(imgEl)) {
                const imgFile = dataURLtoFile(imgEl.src, "img.jpg");
                const promise = new Promise(async(resolve, reject) => {
                    const imgUrl = await imageUploader(imgFile)
                    if(typeof imgUrl !== 'string') {
                        _setData(_getData().replace(imgEl.src, "image upload failed"));
                        await _editor.setData(_getData());
                        reject(new Error("imageUploader should be a function that takes a file as input and a imageUrl as output. \n Or, request or response is wrong."))
                    }
                    else {
                        _setData(_getData().replace(imgEl.src, imgUrl));
                        await _editor.setData(_getData());
                        resolve(imgUrl)
                    }
                })
                promises.push(promise);
            }
        }
        return Promise.allSettled(promises);
    }
}