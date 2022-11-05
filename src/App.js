import Index from "./pages";
import Button from "@mui/material/Button";
import { useState } from "react";
import Article from "./pages/article";

export default function App() {
  const [mode, setMode] = useState(0); // 0: index, 1: create, 2: read
  const [articles, setArticles] = useState([
    { number: 0, title: "title", content: "content", created: getCurrent()}
  ])
  const [id, setId] = useState(0);
  function buttonClick() {
    if(mode === 0) setMode(1);
    if(mode === 1) ;
    if(mode === 2) setMode(0);
  }
  function createArticle(title, content) {
    const newId = articles.length;
    const article = { number: newId, title, content, created: getCurrent() }
    setArticles([...articles, article]);
    setId(newId);
  }
  return (
    <div className="App">
      <a href="https://www.youtube.com/channel/UCUFxEgZL9e3v3MYmcDFy69g">
        <div style={{position: "relative", height:"200px", width: "100%", overflow: "hidden"}}>
          <img src="assets/images/떵유유튜브.png"  style={{position: "absolute", top: "0", left: "0", transform: "translate(50, 50)", width: "100%", height: "100%", objectFit: "cover", margin: "auto"}} alt="떵유 유튜브 구독 좋아요!"/>
        </div>
      </a>
      <Button variant="contained" color="success" style={{width: "100%"}} onClick={buttonClick}>{mode===2?"MAIN":"CREATE"}</Button>
      {mode===0?
        <Index articles={articles} setMode={setMode} setId={setId}/>:
        <Article mode={mode} setMode={setMode} article={mode===2?articles[id]:null} createArticle={createArticle}/>}
      <Button variant="contained" color="success" style={{width: "100%"}} onClick={buttonClick}>{mode===2?"MAIN":"CREATE"}</Button>
    </div>
  );
}

function getCurrent() {
  const current = new Date();
  const date = current.getFullYear() + '-' + ('0' + (current.getMonth() + 1)).slice(-2) + '-' + ('0' + current.getDate()).slice(-2);
  const time = ('0' + current.getHours()).slice(-2) + ':' + ('0' + current.getMinutes()).slice(-2) + ':' + ('0' + current.getSeconds()).slice(-2)
  return date + ' ' + time;
}
