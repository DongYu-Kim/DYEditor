import DYEditor from '../lib/index';

export default function Article({mode, setMode, article, createArticle}) {
  console.log(article)
  return <div>
    <h1>{article.title}</h1>
    {article.content?<DYEditor 
      data={article.content}
      readOnly={mode===2?true:false}
    />:null}
  </div>
}