import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import axiosInstance from "../axios";

// STEP 1 - Include Dependencies
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import SelectAccount from "./SelectAccount";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data
const chartData = [
  {
    label: "Bills",
    value: "290",
  },
  {
    label: "House-Rent",
    value: "260",
  },
  {
    label: "Savings",
    value: "180",
  },
  {
    label: "Pleasures",
    value: "140",
  },
  {
    label: "Miscallenaus",
    value: "115",
  },
];

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "column2d", // The chart type
  width: "100%", // Width of the chart
  height: "350", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      //Set the chart caption
      caption: "Monthly Expenses",
      //Set the chart subcaption
      //Set the x-axis name
      xAxisName: "Categories",
      //Set the y-axis name
      yAxisName: "Amount",
      numberSuffix: "K",
      //Set the theme for your chart
      theme: "fusion",
      color: "var(--clr-green-3)",
    },
    // Chart Data
    data: chartData,
  },
};

function MonthlyReport() {
  const [account, setAccount] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [accountData, setAccontData] = useState([]);
  let data = [];
  const [submit, setSubmit] = useState(false);

  const createData = async () => {
    const server = await axiosInstance.get(
      "/api/get_transactions_account" + "?code=" + account
    );
    setAccontData(server.data);
  };

  useEffect(() => {
    if (account !== "") createData();
  }, [account]);

  useEffect(() => {
    if (submit) {
      accountData.map((row) => {
        let entity = {
          label: "",
          value: "",
        };
        console.log(row.date.split("-"));
        let transaction_year = row.date.split("-")[0];
        let transaction_month = row.date.split("-")[1];

        if (transaction_month === month && transaction_year === year) {
          entity.label = row.category;
          entity.value = row.transaction_amount;
          console.log(entity);
        }
      });
    }
  }, [submit]);
  return (
    <Container>
      {" "}
      {/* STEP 4 - Creating the DOM element to pass the
      react-fusioncharts component*/}
      <h3> View your Monthly report</h3>
      <Wrapper>
        <SelectAccount setAccount={setAccount} account={account} />
        <MonthPicker month={month} setMonth={setMonth} />
        <YearPicker year={year} setYear={setYear} />
        <input
          type="submit"
          value="Submit"
          onClick={(e) => {
            setSubmit(!submit);
          }}
        />
      </Wrapper>
      <div className="chart">
        <ReactFC {...chartConfigs} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 60vh;
  width: 100%;
  background-color: var(--clr-white);
  padding: 20px 10px;
  box-shadow: rgb(0 0 0 / 7%) 5px 5px 5px 0px;
  border-radius: 5px;
  overflow-y: auto;

  h3 {
    text-align: center;
  }
  @media screen and (max-width: 580px) {
    padding: 15px 5px;
  }
  .chart {
    margin: 0 20%;

    @media screen and (max-width: 800px) {
      margin: 0 15%;
    }
    @media screen and (max-width: 650px) {
      margin: 0 auto;
    }
  }
`;

const Wrapper = styled.div`
  display: grid;
  margin: 0 30%;
  grid-template-columns: auto auto auto auto;
  input[type="submit"] {
    height: 50%;
    background-color: var(--clr-green-3);
    color: white;
    padding: 6px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    font-size: 15px;
    margin-top: 25px;
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 5px 5px;
  }
  input[type="submit"]:hover {
    background-color: var(--clr-green-3);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }

  @media screen and (max-width: 800px) {
    margin: 0 15%;
  }
  @media screen and (max-width: 650px) {
    margin: 0 auto;
  }
`;
export default MonthlyReport;
