import TextField from "@mui/material/TextField";

export let title;
export default function Title({mode, text}) {
    return <div>
        <TextField onChange={event=>title=event.target.value} label="Title" variant={mode!==2?"outlined":"filled"} inputProps={{readOnly: mode!==2?false:true, style: {fontSize:"32px", fontWeight:"bold"}}} fullWidth defaultValue={text}/>
    </div>
}