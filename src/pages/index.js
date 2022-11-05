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

export default function Index({articles, setMode, setId}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  function clickArticle(id) {
    setMode(2);
    setId(id);
  }
  
  return (
    <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="right">Title</TableCell>
          <TableCell align="right">Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {articles.map(({ number, title, created }) => (
          <TableRow key={number} onClick={()=>clickArticle(number)}>
            <TableCell>{number}</TableCell>
            <TableCell align="right">{title}</TableCell>
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