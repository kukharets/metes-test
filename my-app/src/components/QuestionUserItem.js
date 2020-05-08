import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  home: {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(84,159,235,0.13)"
  },
  mainBox: {
    position: "relative",
    display: "flex",
    alignContent: "center",
    justifyItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    minWidth: "400px",
    minHeight: "150px"
  },
  mainText: {
    fontSize: "25px"
  },
  title: {
    color: "red"
  },
  editControls: {
    display: "flex",
    dlexDirection: "row",
    marginTop: "10px",
    position: "absolute",
    right: "-20px",
    bottom: "-55px"
  },
  back: {
    marginRight: "30px"
  }
}));

export function QuestionUserItem({ data, doneData, index, onSubmit, onBack }) {
  const classes = useStyles();
  const [chekeds, setCheckeds] = useState([]);
  const { question, answers } = doneData || data;

  useEffect(() => {
    const newChecked = [];
    answers.forEach((answer, index) => {
      if (answer.isChecked) {
        newChecked.push(index);
      }
    });
    setCheckeds(newChecked);
  }, [doneData]);

  const checkItem = index => {
    const currentChekeds = [];
    if (!chekeds.includes(index)) {
      currentChekeds.push(index);
    }
    chekeds.forEach(checkedItem => {
      if (checkedItem !== index) {
        currentChekeds.push(checkedItem);
      }
    });
    setCheckeds(currentChekeds);
  };

  const handleSubmit = () => {
    const newAnswers = answers.map((answer, index) => {
      if (chekeds.includes(index)) {
        return { ...answer, isChecked: true };
      }
      return { ...answer, isChecked: false };
    });

    const newData = { ...data, answers: newAnswers };
    onSubmit(newData);
    setCheckeds([]);
  };

  return (
    <Box className={classes.mainBox}>
      <Typography className={classes.mainText} variant="subtitle2">
        {question}
      </Typography>
      {answers.map((answer, index) => (
        <FormControlLabel
          key={`answer${index}`}
          control={
            <Checkbox
              checked={chekeds.includes(index)}
              onChange={() => checkItem(index)}
              name="checkedA"
            />
          }
          label={answer.answerText}
        />
      ))}
      <Box className={classes.editControls}>
        {index !== 0 && (
          <Button
            className={classes.back}
            onClick={onBack}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        )}
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
}
