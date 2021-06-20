import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import styled from "styled-components";
import { Accounts, Dashboard, Reports } from "./pages";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "hsl(156, 68%, 47%)",
    },
    secondary: {
      main: "hsl(209, 72%, 31%);",
    },
  },
});

function App() {
  /*  useEffect(() => {
    window.alert(
      "Ps be patient as the backend is running on HEROKU and it will be slow for the first time"
    );
  }, []); */
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Wrapper>
          <Sidebar />
          <Switch>
            <Route path="/accounts">
              <Accounts />
            </Route>
            <Route path="/reports">
              <Reports />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}
const Wrapper = styled.main`
  display: flex;
`;
export default App;
