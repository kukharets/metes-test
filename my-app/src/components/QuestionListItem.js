import { Box, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  questionListItem: {
    minHeight: "30px",
    maxHeight: "30px",
    width: "100%",
    border: '1px solid lightblue',
    borderRadius: '3px',
    textAlign: 'start',
    padding: '0 4px'
  },
  question: {
    fontSize: "10px",
    textOverflow: "hidden"
  }
}));
export default function QuestionListItem({ question }) {
  const classes = useStyles();

  return (
    <Box className={classes.questionListItem}>
      <Typography className={classes.question}>{question}</Typography>
    </Box>
  );
}
