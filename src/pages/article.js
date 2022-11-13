import Title from '../components/Title';
import {DYEditor} from '../App';
import fileToURL from '../functions/filetoURL';

export default function Article({mode, article}) {
  return <div>
    <Title mode={mode} text={article.title}/>
    <DYEditor 
      data={article.content}
      readOnly={mode===2}
      imageUploader={fileToURL}
    />
  </div>
}