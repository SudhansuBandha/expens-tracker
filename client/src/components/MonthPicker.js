import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MonthPicker({ month, setMonth }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(month);

  const handleChange = (event) => {
    setMonth(event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Month</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value={"01"}>January</MenuItem>
        <MenuItem value={"02"}>February</MenuItem>
        <MenuItem value={"03"}>March</MenuItem>
        <MenuItem value={"04"}>April</MenuItem>
        <MenuItem value={"05"}>May</MenuItem>
        <MenuItem value={"06"}>June</MenuItem>
        <MenuItem value={"07"}>July</MenuItem>
        <MenuItem value={"08"}>August</MenuItem>
        <MenuItem value={"09"}>Spetember</MenuItem>
        <MenuItem value={"10"}>October</MenuItem>
        <MenuItem value={"11"}>November</MenuItem>
        <MenuItem value={"12"}>December</MenuItem>
      </Select>
    </FormControl>
  );
}
