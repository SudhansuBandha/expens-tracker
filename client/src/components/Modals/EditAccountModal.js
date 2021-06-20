import React, { useState } from "react";
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

export default function EditTransactionModal({ open, setClose, data }) {
  const [acc_num, setAccount] = useState(data.account_number);
  const [name, setName] = useState(data.bank_name);
  const { accountTrigger, setAccountTrigger } = useGlobalContext();

  function onSubmit(e) {
    e.preventDefault();
    const url = "/api/edit_account/" + acc_num;

    axiosInstance
      .put(url, {
        account_number: acc_num,
        bank_name: name,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.status === 200) {
          setClose();
          window.alert("Account Info Edited Successfully");
          setAccountTrigger(!accountTrigger);
        }
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

          <h3>edit account</h3>
          <label>Account Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label>Account Number:</label>
          <input
            type="text"
            value={acc_num}
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          />
          <br />

          <input
            type="submit"
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
    background-color: var(--clr-green-3);
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
    background-color: var(--clr-green-3);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }
`;
