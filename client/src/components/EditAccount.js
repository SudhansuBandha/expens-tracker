import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectAccount from "./SelectAccount";
import AccountsTable from "./AccountTable";
import axiosInstance from "../axios";
import { useGlobalContext } from "../context/context";

function EditAccount() {
  const [data, setData] = useState([]);
  const { accountTrigger } = useGlobalContext();
  const createData = async () => {
    const server = await axiosInstance.get("/api/accounts");
    setData(server.data);
  };

  useEffect(() => {
    createData();
  }, []);

  useEffect(() => {
    createData();
  }, [accountTrigger]);
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h4>edit account</h4>
      </div>
      <AccountsTable data={data} />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 65px;
  padding: 20px 10px;
  width: 100%;
  min-height: 40vh;
  background-color: var(--clr-white);
  box-shadow: rgb(0 0 0 / 7%) 5px 5px 5px 5px;
  border-radius: 5px;
`;

export default EditAccount;
