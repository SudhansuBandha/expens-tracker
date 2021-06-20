import React, { useEffect } from "react";
import styled from "styled-components";
import EditAccount from "../components/EditAccount";
import TransactionAccounts from "../components/TransactionsAccounts";
import { useGlobalContext } from "../context/context";

function Accounts() {
  const { refresh } = useGlobalContext();

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Container>
      <TransactionAccounts />
      <EditAccount />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 84vw;
  padding: 20px 20px 0px 20px;
  @media screen and (max-width: 900px) {
    width: 100vw;
    padding: 10px;
  }
`;

export default Accounts;
