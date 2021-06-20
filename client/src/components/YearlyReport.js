import React from "react";
import styled from "styled-components";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type

// Include the theme as fusion
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import SelectAccount from "./SelectAccount";
import YearPicker from "./YearPicker";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, CandyTheme);
// STEP 3 - Creating the JSON object to store the chart configurations
const data = [
  {
    label: "Equity",
    value: "300000",
  },
  {
    label: "Debt",
    value: "230000",
  },
  {
    label: "Bullion",
    value: "180000",
  },
  {
    label: "Real-estate",
    value: "270000",
  },
  {
    label: "Insurance",
    value: "20000",
  },
];

const ChartComponent = () => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages",
        theme: "candy",
        decimals: 0,
        pieRadius: "65%",
      },
      // Chart Data
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};
function YearlyReport() {
  return (
    <Container>
      {" "}
      {/* STEP 4 - Creating the DOM element to pass the
  react-fusioncharts component*/}
      <h3> View your Annual report</h3>
      <Wrapper>
        <SelectAccount />

        <YearPicker />
        <input type="submit" value="Submit" />
      </Wrapper>
      <div className="chart">
        <ChartComponent />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  min-height: 60vh;
  width: 100%;
  background-color: var(--clr-white);
  padding: 20px 10px;
  box-shadow: rgb(0 0 0 / 7%) 5px 5px 5px 0px;
  border-radius: 5px;
  overflow-y: scroll;

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
export default YearlyReport;
