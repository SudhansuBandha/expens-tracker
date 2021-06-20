import React, { useState } from "react";
import styled from "styled-components";
import DateSelector from "./DateSelector";
import SelectAccount from "./SelectAccount";
import axiosInstance from "../axios";
import { useGlobalContext } from "../context/context";
import Message from "./Message";
import SelectCategory from "./SelectCategory";
function HeroSection() {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { transactionTrigger, setTransactionTrigger } = useGlobalContext();
  function onSubmit(e) {
    e.preventDefault();
    console.log(number);

    let year = JSON.stringify(date.getFullYear());
    let month = JSON.stringify(date.getMonth() + 1);
    let day = JSON.stringify(date.getDate());
    var resulted_date = day + "-" + month + "-" + year;
    console.log(resulted_date);
    console.log(account);
    console.log(category);

    axiosInstance
      .post("/api/add_transactions/", {
        account_number: account,
        date: resulted_date,
        transaction_amount: number,
        category: category,
      })
      .then((res) => {
        console.log(res.data);
        setTransactionTrigger(!transactionTrigger);
      });

    //print();
    setIsOpen(true);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <h4 style={{ color: "var(--clr-blue-1)" }}>
            Your expenditure in last 30 days
          </h4>
          <Circle>
            <h1 style={{ color: "var(--clr-white)" }}>$50</h1>
          </Circle>
        </Left>
        <Right>
          <Form>
            <h4 style={{ textAlign: "center" }}>add transactions</h4>
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
            <div style={{ display: "flex" }}>
              <SelectAccount setAccount={setAccount} account={account} />
              <SelectCategory setCategory={setCategory} category={category} />
            </div>

            <br />
            <DateSelector setDate={setDate} initialDate={new Date()} />
            <br />
            <br />
            <input
              type="submit"
              onClick={(e) => {
                onSubmit(e);
              }}
            />
          </Form>
        </Right>
      </Wrapper>

      <Message
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  min-height: 45vh;
  width: 100%;
  background-color: var(--clr-white);
  padding: 20px 10px;
  box-shadow: rgb(0 0 0 / 7%) 5px 5px 5px 0px;
  border-radius: 5px;
  overflow-y: auto;
  @media screen and (max-width: 772px) {
    padding: 15px 5px;
    h4 {
      font-size: 1rem;
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const Circle = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  background-color: var(--clr-green-3);
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 450px) and (max-width: 1100px) {
    height: 200px;
    width: 200px;
  }
  @media screen and (max-width: 450px) {
    height: 150px;
    width: 150px;
  }
`;
const Left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  /*display: flex;
  justify-content: center;
  align-items: center;*/
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
    width: 100px;
    font-size: 15px;
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 5px 5px;
  }
  input[type="submit"]:hover {
    background-color: var(--clr-green-3);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }
`;
export default HeroSection;
