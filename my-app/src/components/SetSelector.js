import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Button, TextField } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  selectAddSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    right: "30px",
    top: "0"
  },
  editBtn: {
    color: "blue",
    cursor: "pointer"
  },
  addEditField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  controls: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row"
  },
  submitButton: {
    marginRight: "10px"
  }
}));

export default function SetSelector({
  disabled,
  data,
  addEditSet,
  deleteSet,
  handleSelectSet,
  selectedSet
}) {
  const classes = useStyles();
  const [localSets, setLocalSets] = useState(data);
  const [addEditSetState, setAddEditSetState] = useState(false);

  const setSelectedSet = data => {
    handleSelectSet(data);
  };

  React.useEffect(() => {
    if (data.length > 0) {
      setAddEditSetState(false);
      setLocalSets(data);
      setSelectedSet(data[data.length - 1]);
    }
  }, [data]);

  const handleChangeSelectedSet = e => {
    setSelectedSet(localSets.find(set => set.uuid === e.target.value));
  };

  const handleChangeSetTitle = value => {
    const newSelectedSet = { ...selectedSet };
    newSelectedSet.title = value;
    setSelectedSet(newSelectedSet);
  };

  const handleSubmitSet = () => {
    addEditSet(selectedSet);
  };

  return (
    <Box className={classes.selectAddSet}>
      {selectedSet.uuid && (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sets</InputLabel>
          <Select
            disabled={!!disabled}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSet.uuid}
            onChange={handleChangeSelectedSet}
          >
            {localSets.map(set => (
              <MenuItem key={`menu-item${set.uuid}`} value={set.uuid}>{set.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Box className={classes.controls}>
        {!addEditSetState && !disabled && (
          <Add
            onClick={() => {
              setSelectedSet({});
              setAddEditSetState(true);
            }}
            className={classes.editBtn}
          />
        )}
        {!addEditSetState && selectedSet && selectedSet.uuid && !disabled && (
          <Edit
            onClick={() => setAddEditSetState(true)}
            className={classes.editBtn}
          />
        )}
        {!addEditSetState && selectedSet && selectedSet.uuid && !disabled && (
          <Delete
            onClick={() => deleteSet(selectedSet)}
            className={classes.editBtn}
          />
        )}
      </Box>
      {addEditSetState && (
        <Box className={classes.addEditField}>
          <TextField
            fullWidth
            label="New  set title"
            value={selectedSet.title}
            onChange={e => handleChangeSetTitle(e.target.value)}
            multiline
            className={classes.conditionMessage}
          >
            {selectedSet.title}
          </TextField>
          <Button
            onClick={handleSubmitSet}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setAddEditSetState(false);
              setSelectedSet(localSets[0]);
            }}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}
