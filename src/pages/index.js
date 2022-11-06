import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

export default function Index({articles, readArticle}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  
  return (
    <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell style={{fontWeight:"bold"}}>No</TableCell>
          <TableCell align="center" style={{fontWeight:"bold"}}>Title</TableCell>
          <TableCell align="right" style={{fontWeight:"bold"}}>Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!articles.length?<TableRow><TableCell/><TableCell align="center">There are no articles.</TableCell><TableCell/></TableRow>:null}
        {articles.map(({ number, title, created }) => (
          <TableRow key={number} style={{cursor:"pointer"}} onClick={()=>readArticle(number)}>
            <TableCell>{number}</TableCell>
            <TableCell align="center">{title}</TableCell>
            <TableCell align="right">{created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={articles.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
  )
}