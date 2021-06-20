import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionTable from "./TransactionTable";
import axiosInstance from "../axios";
import { useGlobalContext } from "../context/context";

function LatestTransactions() {
  const [data, setData] = useState([]);
  const { transactionTrigger } = useGlobalContext();
  const createData = async () => {
    const server = await axiosInstance.get("/api/latest_transactions");
    setData(server.data);
  };

  useEffect(() => {
    createData();
  }, []);

  useEffect(() => {
    createData();
  }, [transactionTrigger]);

  return (
    <Container>
      <h4 style={{ textAlign: "center" }}>View your latest expenses</h4>
      <TransactionTable data={data} />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 35px;
  padding: 20px 10px;
  width: 100%;
  min-height: 45vh;
  background-color: var(--clr-white);
  box-shadow: rgb(0 0 0 / 7%) 5px 5px 5px 5px;
  border-radius: 5px;
  overflow-y: auto;
`;

export default LatestTransactions;
