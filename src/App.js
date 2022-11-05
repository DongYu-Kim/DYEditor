import Index from "./pages";
import { useState } from "react";
import Article from "./pages/article";
import ButtonSet from "./components/ButtonSet";
import DYEditor, { getData, uploadImages } from "./lib";
export {DYEditor};

let cnt = 1;
const defaultArticle = { number: 0, title: "", content: "", created: getCurrent() };
export default function App() {
  const [mode, setMode] = useState(0); // 0: index, 1: create, 2: read, 3: update
  const [articles, setArticles] = useState([
    { number: cnt, title: "title", content: "content", created: getCurrent()}
  ])
  const [id, setId] = useState(0);

  // methods
  function createArticle(title, content) {
    switch (mode) {
      case 0:
        readArticle();
        setMode(1);
        break;
      case 1:
        if(!title || !content) return;
        cnt += 1;
        const article = { number: cnt, title, content, created: getCurrent() }
        setArticles([...articles, article]);
        readArticle(cnt);
        break;
      default:
        console.error("The createArticle function can be used only when mode is 0 or 1.")
        break;
    }
  }
  function readArticle(id = 0) {
    setId(id);
    if(mode !== 2) setMode(2);
    else setMode(0);
  }
  function updateArticle(id, title, content) {
    readArticle(id);
    switch (mode) {
      case 2:
        setMode(3);
        break;
      case 3:
        if(!title || !content) return;
        const article = articles.find(article => article.number === id)
        article.title = title;
        article.content = content;
        setArticles([...articles]);
        setMode(2)
        break;
      default:
        console.error("The updateArticle function can be used only when mode is 2 or 3.")
        break;
    }
  }
  function deleteArticle(id) {
    switch (mode) {
      case 2:
        setArticles(articles.filter(article => article.number !== id));
        readArticle();
        setMode(0);
        break;
      default:
        console.error("The deleteArticle function can be used only when mode is 2.")
        break;
    }
  }

  //
  return (
    <div className="App">
      <a href="https://www.youtube.com/channel/UCUFxEgZL9e3v3MYmcDFy69g">
        <div style={{position: "relative", height:"200px", width: "100%", overflow: "hidden"}}>
          <img src="assets/images/떵유유튜브.png"  style={{position: "absolute", top: "0", left: "0", transform: "translate(50, 50)", width: "100%", height: "100%", objectFit: "cover", margin: "auto"}} alt="떵유 유튜브 구독 좋아요!"/>
        </div>
      </a>
      {mode===0?<ButtonSet mode={mode} createArticle={createArticle}/>:null}  
      {mode===0?
        <Index articles={articles} readArticle={readArticle}/>:
        <Article mode={mode} article={id!==0?articles.find(article => article.number===id):defaultArticle}/>}
      <ButtonSet mode={mode} id={id} createArticle={createArticle} readArticle={readArticle} updateArticle={updateArticle} deleteArticle={deleteArticle}/>
    </div>
  );
}

function getCurrent() {
  const current = new Date();
  const date = current.getFullYear() + '-' + ('0' + (current.getMonth() + 1)).slice(-2) + '-' + ('0' + current.getDate()).slice(-2);
  const time = ('0' + current.getHours()).slice(-2) + ':' + ('0' + current.getMinutes()).slice(-2) + ':' + ('0' + current.getSeconds()).slice(-2)
  return date + ' ' + time;
}

export async function getContent() {
  if(typeof uploadImages === "function") await uploadImages();
  if(typeof getData === "function") return getData();
}