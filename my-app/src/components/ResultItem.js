import React from "react";
import { Box, Divider } from "@material-ui/core";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  resultsMain: {
    padding: "20px 150px",
    minWidth: "500px"
  },
  resultLegendBlock: {
    height: "20px",
    width: "20px",
    marginRight: "10px"
  },
  mainText: {
    fontSize: "25px"
  },
  checkedAnswer: {
    backgroundColor: "rgb(0,135,42)"
  },
  successMessage: {
    marginLeft: "30px",
    backgroundColor: "rgb(68,128,172)"
  },
  deathMessage: {
    marginLeft: "30px",
    backgroundColor: "rgb(174,61,39)"
  },
  checkedAnswerText: {
    color: "rgb(0,135,42)"
  },
  successMessageText: {
    marginLeft: "30px",
    color: "rgb(68,128,172)"
  },
  deathMessageText: {
    marginLeft: "30px",
    color: "rgb(174,61,39)"
  },
  legendRow: {
    display: "flex",
    height: "20px",
    justifyContent: "center",
    flexDirection: "row"
  },
  legend: {
    display: "flex",
    height: "20px",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "30px"
  },
  singleQuestion: {
    margin: "20px",
    padding: "20px",
    border: "2px solid lightgray",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  },
  divider: {
    width: "50%",
    margin: "10px 0"
  },
  radio: {
    height: "12px"
  },
  answerRow: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  answersContainer: {
    position: "relative",
    width: "100%"
  }
}));

export default function ResultItem({ data }) {
  const { date, doneQuestions, userName } = data;
  const classes = useStyles();
  return (
    <Box className={classes.resultsMain}>
      <Box className={classes.legend}>
        <div className={classes.legendRow}>
          <div
            className={`${classes.resultLegendBlock} ${classes.checkedAnswer}`}
          ></div>
          Checked answer
        </div>
        <div className={classes.legendRow}>
          <div
            className={`${classes.resultLegendBlock} ${classes.deathMessage}`}
          ></div>
          Shown death message
        </div>
        <div className={classes.legendRow}>
          <div
            className={`${classes.resultLegendBlock} ${classes.successMessage}`}
          ></div>
          Added to last message
        </div>
      </Box>
      <Typography className={classes.mainText} variant="subtitle2">
        {`Results of ${userName} from ${date}`}
      </Typography>
      <Box className={classes.resultsList}>
        {doneQuestions.map(({ answers, question }, index) => (
          <Box key={`question${index}`} className={classes.singleQuestion}>
            <Typography variant="subtitle1">{question}</Typography>
            <Divider className={classes.divider} />
            <Box className={classes.answersContainer}>
              {answers.map(
                (
                  { answerText, deathMessageText, isChecked, lastMessageText },
                  answerIndex
                ) => (
                  <Box key={`answer${answerIndex}`}>
                    <Box className={classes.answerRow}>
                      {isChecked ? (
                        <RadioButtonChecked className={classes.radio} />
                      ) : (
                        <RadioButtonUnchecked className={classes.radio} />
                      )}
                      <Typography
                        variant="subtitle2"
                        className={
                          isChecked ? classes.checkedAnswerText : classes.answer
                        }
                      >
                        {answerText}
                      </Typography>
                    </Box>
                    {deathMessageText && isChecked && (
                      <Typography
                        label="Death message"
                        variant="subtitle2"
                        className={classes.deathMessageText}
                      >
                        {deathMessageText}
                      </Typography>
                    )}
                    {lastMessageText && isChecked && (
                      <Typography
                        label="Death message"
                        variant="subtitle2"
                        className={classes.successMessageText}
                      >
                        {lastMessageText}
                      </Typography>
                    )}
                  </Box>
                )
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
