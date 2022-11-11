import Title from '../components/Title';
import {DYEditor} from '../App';
import fileToURL from '../functions/filetoURL';

export default function Article({mode, article, setState, state}) {
  return <div>
    <Title mode={mode} text={article.title} setState={setState} state={state}/>
    <DYEditor 
      data={article.content}
      readOnly={mode===2}
      imageUploader={fileToURL}
    />
  </div>
}