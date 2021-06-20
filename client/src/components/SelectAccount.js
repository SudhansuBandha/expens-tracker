import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axiosInstance from "../axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectAccount({ setAccount, account }) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(account);
  const handleChange = (event) => {
    setAccount(event.target.value);
    setValue(event.target.value);
  };

  const createData = async () => {
    const server = await axiosInstance.get("/api/accounts");
    setData(server.data);
  };
  useEffect(async () => {
    createData();
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Account</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {/*<MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
  <MenuItem value={30}>Thirty</MenuItem>*/}
        {data.map((account) => {
          return (
            <MenuItem
              value={account.account_number}
              key={account.account_number}
            >
              {account.account_number}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
