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
import EditAccountModal from "./Modals/EditAccountModal";
import DeleteAccountModal from "./Modals/DeleteAccountModal";

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

export default function AccountsTable({ data }) {
  const classes = useStyles();
  const [row, setRow] = useState({});
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const openEditAccountModal = (props) => {
    setRow(props);
    setIsEditAccountModalOpen(true);
  };
  const closeEditAccountModal = () => {
    setIsEditAccountModalOpen(false);
  };
  const openDeleteAccountModal = (props) => {
    setRow(props);
    setIsDeleteAccountModalOpen(true);
  };
  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
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
                Account Number
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Account Name
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Edit
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.account_number}>
                <StyledTableCell align="center">
                  {row.account_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.bank_name}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  style={{ color: "var(--clr-blue-1)" }}
                >
                  <h5>
                    <FaPencilAlt
                      style={{ cursor: "pointer", marginBottom: "-10px" }}
                      onClick={(e) => {
                        openEditAccountModal(row);
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
                        openDeleteAccountModal(row);
                      }}
                    />
                  </h4>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEditAccountModalOpen && (
        <EditAccountModal
          data={row}
          open={isEditAccountModalOpen}
          setClose={closeEditAccountModal}
        />
      )}
      {isDeleteAccountModalOpen && (
        <DeleteAccountModal
          data={row}
          open={isDeleteAccountModalOpen}
          setClose={closeDeleteAccountModal}
        />
      )}
    </>
  );
}
