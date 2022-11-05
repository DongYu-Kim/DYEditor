import Button from "@mui/material/Button";

export default function DELETE({click}) {
    return <Button variant="contained" color="error" style={{width: "100%"}} onClick={click}>"DELETE"</Button>
}