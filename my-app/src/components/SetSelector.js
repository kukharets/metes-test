import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Button, TextField } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import generateUuid from "../helpers/generateUuid";

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

export default function SetSelector({ data, addEditSet, deleteSet,saveSetState, handleSelectSet, selectedSet }) {
  const classes = useStyles();
  const [localSets, setLocalSets] = React.useState(data);
  const [addEditSetState, setAddEditSetState] = React.useState(false);
  const [selectedSetTitle, setSelectedSetTitle] = React.useState("");
  const [editSetState, setEditSetState] = React.useState(false);

  console.error('SS SS', selectedSet)

  const setSelectedSet = (data) => {
    handleSelectSet(data);
  }

  React.useEffect(() => {
    if (data.length > 0) {
      setAddEditSetState(false);
      setLocalSets(data);
      console.warn('data', data)
      !selectedSet.uuid && setSelectedSet(data[data.length - 1]);
    }

  }, [data]);


  const handleChangeSelectedSet = e => {
    setSelectedSet(localSets.find(set => set.uuid === e.target.value));
  };

  const handleChangeSetTitle = value => {
    console.warn("handleChangeSetTitle", value);
    const newSelectedSet = { ...selectedSet };
    newSelectedSet.title = value;
    setSelectedSet(newSelectedSet);
  };

  const handleSubmitSet = event => {
    addEditSet(selectedSet);
  };

  const handleDeleteSet = set => {
    deleteSet(set);
  };

  console.warn("SETS", selectedSet.uuid, localSets, selectedSet);

  return (
    <Box className={classes.selectAddSet}>
      {selectedSet.uuid &&
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sets</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSet.uuid}
          onChange={handleChangeSelectedSet}
        >
          {localSets.map(set => (
            <MenuItem value={set.uuid}>{set.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      }
      <Box className={classes.controls}>
        {!addEditSetState && (
          <Add
            onClick={() => {
              setSelectedSet({});
              setAddEditSetState(true);
            }}
            className={classes.editBtn}
          />
        )}
        {!addEditSetState && selectedSet && selectedSet.uuid && (
          <Edit
            onClick={() => setAddEditSetState(true)}
            className={classes.editBtn}
          />
        )}
        {!addEditSetState && selectedSet && selectedSet.uuid && (
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
            sizeSmall
            onClick={handleSubmitSet}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            sizeSmall
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
