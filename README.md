# DYEditor
DYEditor is custom made to use [CKEditor5](https://www.npmjs.com/package/ckeditor5) in React.
By using this, you can use CKEditor5 more conveniently.   

## Quick start
```javascript
import DYEditor, {getData, uploadImages} from 'dyeditor/dist';

export default Component () => {
    return <DYEditor 
        data={_data} // _data is the initial value. data must be a string.
        readOnly={_readOnly} // readOnly must be a boolean.
        imageUploader={_imageUploader} // imageUploader must be a function that takes a file as input and a imageUrl as output.
    />
}
```