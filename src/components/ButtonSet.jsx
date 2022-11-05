import { CREATE, MAIN, UPDATE, DELETE } from "./buttons";
import { title } from "./Title";
import { getContent } from "../App";

export default function ButtonSet({ mode, id, createArticle, readArticle, updateArticle, deleteArticle }) {
    return <div style={{display: "flex"}}>
        {mode===0||mode===1?<CREATE click={async()=>{let content;if(mode===1 && title)content = await getContent();createArticle(title, content)}}/>:null}
        {mode===2?<MAIN click={()=>readArticle(id)}/>:null}
        {mode===2||mode===3?<UPDATE click={async()=>{const content = await getContent();updateArticle(id, title, content)}}/>:null}
        {mode===2?<DELETE click={()=>deleteArticle(id)}/>:null}
    </div>
}