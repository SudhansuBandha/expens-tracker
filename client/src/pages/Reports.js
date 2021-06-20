import React, { useEffect } from "react";
import styled from "styled-components";
import MonthlyReport from "../components/MonthlyReport";
import YearlyReport from "../components/YearlyReport";
import { useGlobalContext } from "../context/context";
function Reports() {
  const { refresh } = useGlobalContext();

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Container>
      <MonthlyReport />
      <YearlyReport />
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
  overflow: auto;
  @media screen and (max-width: 900px) {
    width: 100vw;
    padding: 10px;
  }
`;

export default Reports;
