import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import EditTransactionModal from "./Modals/EditTransactionModal";
import DeleteTransactionModal from "./Modals/DeleteTransactionModal";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  tableRow: {
    height: 30,
  },
  tableCell: {
    padding: "0px 30px",
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 30,
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 30px",
  },
}))(TableCell);

export default function TransactionTable({ data }) {
  const classes = useStyles();
  const [row, setRow] = useState({});
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);

  const openEditTransactionModal = (props) => {
    setRow(props);
    //console.log(props);
    setIsEditTransactionModalOpen(true);
  };
  const closeEditTransactionModal = () => {
    setIsEditTransactionModalOpen(false);
  };
  const openDeleteTransactionModal = (props) => {
    setRow(props);
    setIsDeleteTransactionModalOpen(true);
  };
  const closeDeleteTransactionModal = () => {
    setIsDeleteTransactionModalOpen(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ border: "2px solid var(--clr-grey-2)" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} align="center">
                <strong>Id</strong>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>Transaction Amount</strong>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>Account</strong>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>Date</strong>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>Category</strong>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>Edit</strong>
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>Delete</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">{row.id}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.transaction_amount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.account_number}
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.category}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: "var(--clr-blue-1)" }}
                >
                  <h5>
                    <FaPencilAlt
                      style={{ cursor: "pointer", marginBottom: "-10px" }}
                      onClick={(e) => {
                        openEditTransactionModal(row);
                      }}
                    />
                  </h5>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: "var(--clr-red)" }}
                >
                  <h4>
                    <FaTimes
                      style={{ cursor: "pointer", marginBottom: "-10px" }}
                      onClick={(e) => {
                        openDeleteTransactionModal(row);
                      }}
                    />
                  </h4>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEditTransactionModalOpen && (
        <EditTransactionModal
          data={row}
          open={isEditTransactionModalOpen}
          setClose={closeEditTransactionModal}
        />
      )}
      {isDeleteTransactionModalOpen && (
        <DeleteTransactionModal
          data={row}
          open={isDeleteTransactionModalOpen}
          setClose={closeDeleteTransactionModal}
        />
      )}
    </>
  );
}
