import { Box, Typography } from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown, Add, Delete } from "@material-ui/icons";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  questionListItem: {
    cursor: "pointer",
    minHeight: "30px",
    maxHeight: "30px",
    width: "100%",
    border: "1px solid lightblue",
    borderRadius: "3px",
    textAlign: "start",
    padding: "0 4px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    "&:hover": {
      width: "110%",
      marginLeft: "-10%"
    }
  },
  question: {
    fontSize: "10px",
    textOverflow: "hidden"
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: "30px",
    maxHeight: "30px",
    position: "absolute",
    right: "-98px",
    top: "-2px"
  },
  icon: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "lightblue"
    }
  }
}));
export default function QuestionListItem({
  data,
  index,
  onAddNewQuestion,
  onDeleteQuestion,
  moveTo,
  withControls
}) {
  const { question } = data;
  const classes = useStyles();

  return (
    <Box
      onClick={() => {
        onAddNewQuestion && onAddNewQuestion({ data, index, isExisted: true });
      }}
      className={classes.questionListItem}
    >
      <Typography className={classes.question}>{question}</Typography>
      {withControls && (
        <Box className={classes.controls}>
          <ArrowDropUp
            className={classes.icon}
            onClick={e => {
              moveTo({ data, from: index, to: index - 1 });
              e.preventDefault();
              e.stopPropagation();
            }}
          ></ArrowDropUp>
          <Add
            className={classes.icon}
            onClick={e => {
              onAddNewQuestion({ data: {}, index: index + 1 });
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <Delete
            className={classes.icon}
            onClick={e => {
              onDeleteQuestion(index);
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <ArrowDropDown
            className={classes.icon}
            onClick={e => {
              moveTo({ data, from: index, to: index + 1 });
              e.preventDefault();
              e.stopPropagation();
            }}
          ></ArrowDropDown>
        </Box>
      )}
    </Box>
  );
}
