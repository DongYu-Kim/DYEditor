# DYEditor
DYEditor is custom made to use [CKEditor5](https://www.npmjs.com/package/ckeditor5) in React.
By using this, you can use CKEditor5 more conveniently.   

## Quick start
> npm install --save DYEditor

```javascript
import DYEditor, {getData, uploadImages} from "DYEditor/dyeditor";

export default Component () => {
    return <DYEditor 
        data={_data} // _data is the initial value. data must be a string.
        readOnly={_readOnly} // readOnly must be a boolean.
        imageUploader={_imageUploader} // imageUploader should be null or a function that takes a file as input and a imageUrl as output.
    />
}
```