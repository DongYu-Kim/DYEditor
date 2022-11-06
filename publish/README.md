# DYEditor
DYEditor is custom made to use [CKEditor5](https://www.npmjs.com/package/ckeditor5) in React.
By using this, you can use CKEditor5 more conveniently.   
CKEditor5 is a really good library. However, my friends around me found it difficult to use. So I simplified the functions to make them easier to use. And, by making both the Base64 image uploader and storage uploader methods available, you can easily upload images.



## Install
```bash
npm install dyeditor
```


## Usages
If you use something like reset.css, the style will not be applied.   
   
dyeditor has 1 component and 2 functions.
```javascript
import DYEditor, { getData, uploadImages } from 'dyeditor';
```

### DYEditor
DYEditor component has 3 props.   
```javascript
import DYEditor from 'dyeditor';

function ReactComponent({_data, _readOnly, _imageUploader}) {
    return <DYEditor
        data={_data}
        readOnly={_readOnly}
        imageUploader={_imageUploader} // imageUploader must be a function that takes a file as input and a imageUrl as output.
    />
}
```
#### props
- **data**   
    data is an initial value. The default value is "".   
- **readOnly**   
    You can select read mode or write mode. true is read mode, false is write mode. The default value is false, which is read mode.
- **imageUploader**   
    You can use Base64 image upload, storage image upload, or no image upload. If imageUploader is a function, it uses image upload. Which image upload to use is covered in the description of [uploadImages](#uploadImages). The default value is null, and image upload is not used.
    **imageUploader must be a function that takes a file as input and a imageUrl as output.**

### getData
When the getData function is called, the created html of DYEditor is returned.

### uploadImages
The uploadImages function saves the Base64 image of DYEditor as a file in the user's storage and converts it to an image URL. Therefore, after executing uploadImages, it is recommended to save the return value of getData() in the Database.
If you want to save the Base64 image to the database, you can use the return value of getData() without executing uploadImages.
uploadImages is an async function.
```javascript
import { getData, uploadImages } from 'dyeditor';

let content;
// use Base64
content = getData();
// use storage
uploadImages().then(()=>{
    content = getData();
})
```

## Example
You can run an example using dkeditor in [DYEditor repository](https://github.com/DongYu-Kim/DYEditor).
```bash
git clone https://github.com/DongYu-Kim/DYEditor.git
cd dyeditor
npm install
npm run start
```


## Contribution
Contribute by fixing documentation, reporting code errors, etc...   
Sending an e-mail is probably the fastest way to respond.