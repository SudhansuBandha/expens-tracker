import React, { useEffect } from "react";
import styled from "styled-components";
import { HeroSection, LatestTransactions } from "../components";
import axiosInstance from "../axios";
import Message from "../components/Message";
import { useGlobalContext } from "../context/context";

function Dashboard() {
  const { refresh } = useGlobalContext();

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Container>
      <HeroSection />
      <LatestTransactions />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 70vw;
  margin: 0 auto;
  padding: 20px 20px 0px 20px;
  @media screen and (max-width: 900px) {
    width: 100vw;
    padding: 10px;
  }
`;

export default Dashboard;
