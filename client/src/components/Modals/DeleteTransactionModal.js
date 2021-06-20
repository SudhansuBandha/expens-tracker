import React from "react";
import ReactDom from "react-dom";
import { useGlobalContext } from "../../context/context";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../axios";
import styled from "styled-components";

const MODAL_STYLES = {
  position: "fixed",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px 30px 30px 30px",
  zIndex: 1000,
  height: "auto",
  width: "auto",
  top: "50%",
  left: "50%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function DeleteTransactionModal({ open, setClose, data }) {
  const { transactionTrigger, setTransactionTrigger } = useGlobalContext();

  function onSubmit(e) {
    e.preventDefault();
    const url = "/api/delete_transaction/" + data.id;

    axiosInstance
      .delete(url)
      .then((res) => {
        //console.log(res.data);
        if (res.status === 204) window.alert("Deleted Successfully");
        setTransactionTrigger(!transactionTrigger);
        setClose();
      })
      .catch((err) => {
        window.alert("error in uploading");
      });
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <Container>
          <h5 onClick={setClose} style={{ color: "var(--clr-red)" }}>
            <FaTimes />
          </h5>

          <h3>delete transaction</h3>

          <div style={{ marginLeft: "2vw" }}>
            {" "}
            <label style={{ marginRight: "5px" }}>
              Transaction Amount: {data.transaction_amount}
            </label>
            <br />
            <label style={{ marginRight: "5px" }}>
              Bank Amount: {data.account_number}
            </label>
            <br />
            <label style={{ marginRight: "5px" }}>Date: {data.date}</label>
            <br />
            <br />
          </div>
          <h5>do you want to delete above details??</h5>
          <input
            type="submit"
            value={"Delete"}
            onClick={(e) => {
              onSubmit(e);
            }}
          />
        </Container>
      </div>
    </>,
    document.getElementById("portal")
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    margin-left: auto;
  }
  h5:hover {
    cursor: pointer;
  }
  h3 {
    text-align: center;
  }

  input[type="text"] {
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    resize: vertical;
  }
  input[type="submit"] {
    justify-content: center;
    background-color: var(--clr-red);
    color: white;
    padding: 6px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 5px 5px;
  }
  input[type="submit"]:hover {
    background-color: var(--clr-red);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }
`;
