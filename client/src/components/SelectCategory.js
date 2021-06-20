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

export default function SelectCategory({ setCategory, category }) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        onChange={handleChange}
      >
        <MenuItem value="House-Rent">House-Rent</MenuItem>
        <MenuItem value="Bills">Bills</MenuItem>
        <MenuItem value="Pleasures">Pleasures</MenuItem>
        <MenuItem value="Savings">Savings</MenuItem>
        <MenuItem value="Miscellaneus">Miscellaneus</MenuItem>
      </Select>
    </FormControl>
  );
}
