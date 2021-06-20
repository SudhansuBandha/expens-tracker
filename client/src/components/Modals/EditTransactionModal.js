import React, { useState } from "react";
import ReactDom from "react-dom";
import { useGlobalContext } from "../../context/context";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../axios";
import styled from "styled-components";
import EditDateSelector from "../EditDateSelector";
import SelectAccount from "../SelectAccount";
import SelectCategory from "../SelectCategory";

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
  const [id, setId] = useState(data.id);
  const [number, setNumber] = useState(data.transaction_amount);
  const [initialDate, setIDate] = useState(data.date);
  const [date, setDate] = useState("");
  const [account, setAccount] = useState(data.account_number);
  const [category, setCategory] = useState(data.category);
  const [change, setChange] = useState(false);

  const {
    transactionTrigger,
    setTransactionTrigger,
    setAccountTrigger,
    accountTrigger,
  } = useGlobalContext();

  function onSubmit(e) {
    e.preventDefault();

    const url = "/api/edit_transaction/" + id;
    const body = {
      account_number: account,
      transaction_amount: number,
      date: "",
      category: category,
    };

    let resulted_date = "";
    if (!change) {
      let year = initialDate.split("-")[0];
      let month = initialDate.split("-")[1];
      let day = initialDate.split("-")[2];
      resulted_date = day + "-" + month + "-" + year;
    } else {
      let year = JSON.stringify(date.getFullYear());
      let month = JSON.stringify(date.getMonth() + 1);
      let day = JSON.stringify(date.getDate());
      resulted_date = day + "-" + month + "-" + year;
    }
    body.date = resulted_date;

    axiosInstance
      .put(url, body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Edited Successfully");
          setClose();
          setTransactionTrigger(!transactionTrigger);
        }
      })
      .catch((err) => {
        window.alert("error in updating");
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

          <h3>edit transaction</h3>
          <Form>
            <div style={{ marginLeft: "2vw" }}>
              {" "}
              <label style={{ marginRight: "5px" }}>Transaction Amount:</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                style={{
                  width: "30%",
                  padding: "12px",
                  border: "1px solid var(--clr-green-3)",
                  borderRadius: "4px ",
                  boxSizing: "border-box",
                  marginTop: "6px",
                }}
              />
              <br />
              <div style={{ display: "flex", marginTop: "14px" }}>
                <SelectAccount setAccount={setAccount} account={account} />
                <SelectCategory setCategory={setCategory} category={category} />
              </div>
              <EditDateSelector
                setDate={setDate}
                initialDate={initialDate}
                onChange={() => {
                  setChange(true);
                }}
              />
              <br />
              <br />
            </div>
            <input
              type="submit"
              onClick={(e) => {
                onSubmit(e);
              }}
            />
          </Form>
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
`;

const Form = styled.form`
  input [type="text"] {
  }
  input[type="submit"] {
    background-color: var(--clr-green-3);
    color: white;
    padding: 6px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 85%;
    font-size: 15px;
    margin-left: 2vw;
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 5px 5px;
  }
  input[type="submit"]:hover {
    background-color: var(--clr-green-3);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }
`;
