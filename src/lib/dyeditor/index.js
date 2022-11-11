import React, { useEffect, useRef } from 'react';
import ClassicEditor from './ckeditor/ckeditor';
import { switchToReadMode, removeImageUploadElement, dataURLtoFile, isBase64Image } from './functions';

let flag = false;
export default React.memo(function DYEditor ({data = "", readOnly = false, imageUploader = null}) {
    flag = false;
    const DYEditorEl = useRef();
    useEffect(() => {
        flag = !flag;
        if(flag) {
            ClassicEditor.create(DYEditorEl.current)
            .then(editor => {
                _editor = editor;
                _editor.setData(data);
                if(imageUploader === null) removeImageUploadElement(_editor);
                else{
                    if(typeof imageUploader === 'function') setUploadImages(_editor, imageUploader);
                }
                if(readOnly) switchToReadMode(_editor);
                getData = () => _editor.getData();
            })
            .catch(err => console.error(err));
        }
        return ()=>{if(_editor && _editor.state !== "destroyed")_editor.destroy()};
    })
    if(typeof data !== "string") console.error("data must be a string.")
    if(typeof readOnly !== "boolean") console.error("readOnly must be a boolean")
    
    return <span ref={DYEditorEl} />
});

let _editor = null;
export let getData = ()=>console.error("getData can be called after the DYEditor component is created.");
export let uploadImages = ()=>console.error("uploadImages is available only after adding imageUploader."); // If not called, the Base64 upload method is used.
function setUploadImages(_editor, imageUploader) {
    uploadImages = async() => {
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
                        reject(new Error("imageUploader should be a function that takes a file as input and a imageUrl as output. \n Or, request or response is wrong."))
                    }
                    else {
                        _setData(_getData().replace(imgEl.src, imgUrl));
                        resolve(imgUrl)
                    }
                })
                promises.push(promise);
            }
        }
        return Promise.allSettled(promises).then(async(results)=>{
            await _editor.setData(_getData())
            return results
        });
    }
}