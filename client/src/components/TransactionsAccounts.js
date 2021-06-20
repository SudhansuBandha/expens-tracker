import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectAccount from "./SelectAccount";
import TransactionTable from "./TransactionTable";
import axiosInstance from "../axios";
import { useGlobalContext } from "../context/context";

function TransactionAccounts() {
  const [data, setData] = useState([]);
  const [account, setAccount] = useState("");
  const { transactionTrigger } = useGlobalContext();
  const createData = async () => {
    const server = await axiosInstance.get(
      "/api/get_transactions_account" + "?code=" + account
    );

    setData(server.data);
  };

  useEffect(() => {
    if (account !== "") createData();
  }, [account, transactionTrigger]);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h4>your transactions by account (select account)</h4>
        <div style={{ marginTop: "-20px" }}>
          <SelectAccount setAccount={setAccount} account={account} />
        </div>
      </div>

      <TransactionTable data={data} />
    </Container>
  );
}

const Container = styled.div`
  min-height: 45vh;
  padding: 20px 10px;
  width: 100%;
  min-height: 40vh;
  overflow-y: auto;
  background-color: var(--clr-white);
  box-shadow: rgb(0 0 0 / 7%) 5px 5px 5px 5px;
  border-radius: 5px;
`;

export default TransactionAccounts;
