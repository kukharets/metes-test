import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import { QuestionUserItem } from "./components/QuestionUserItem";

const useStyles = makeStyles(() => ({
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
    padding: "30px 30px 60px 30px",
    backgroundColor: "white",
    flexDirection: "column"
  },
  mainText: {
    fontSize: "25px"
  },
  title: {
    color: "red"
  },
  editControls: {
    marginTop: "10px",
    position: "absolute",
    right: "5px",
    bottom: "5px"
  },
  errorBox: {
    position: "relative",
    display: "flex",
    alignContent: "center",
    justifyItems: "center",
    padding: "30px 30px 60px 30px",
    backgroundColor: "white",
    flexDirection: "column",
    border: '2px solid red'
  }
}));

function Home({ selectedSet = {} }) {
  const { questions } = selectedSet;
  const classes = useStyles();
  const [flowStep, setFlowStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [doneQuestions, setDoneQuestions] = useState([]);
  const [resultSuccessMessage, setResultSuccessMessage] = useState([]);
  const [localDeathMessage, setLocalDeathMessage] = useState([]);

  const existedSet = selectedSet && selectedSet.title;

  useEffect(() => {
    const lastFlow = JSON.parse(localStorage.getItem("currentData"));
    if (lastFlow) {
      const {
        flowStep,
        userName,
        doneQuestions,
        questionIndex,
        resultSuccessMessage,
        localDeathMessage
      } = lastFlow;
      setFlowStep(flowStep);
      setUserName(userName);
      setQuestionIndex(questionIndex);
      setResultSuccessMessage(resultSuccessMessage);
      doneQuestions && setDoneQuestions(doneQuestions);
      setLocalDeathMessage(localDeathMessage);
    }
  }, []);

  const collectData = () => {
    localStorage.setItem(
      "currentData",
      JSON.stringify({
        flowStep,
        userName,
        doneQuestions,
        questionIndex,
        resultSuccessMessage,
        localDeathMessage
      })
    );
  };

  const handleFinish = () => {
    localStorage.removeItem("currentData");
    setFlowStep(1);
    setUserName("");
    setQuestionIndex(0);
    setDoneQuestions([]);
    setResultSuccessMessage([]);
    setLocalDeathMessage("");
  };

  const handleQuestionNext = data => {
    const { answers } = data;

    answers.forEach(answer => {
      if (answer.isChecked) {
        if (answer.deathMessage) {
          setFlowStep(5);
          setLocalDeathMessage(answer.deathMessageText);
        }
      }
    });

    const currentDoneQuestions = [...doneQuestions];

    if (currentDoneQuestions[questionIndex]) {
      currentDoneQuestions[questionIndex] = data;
    } else {
      currentDoneQuestions.push(data);
    }
    setDoneQuestions(currentDoneQuestions);
    questionIndex === questions.length - 1
      ? setFlowStep(4)
      : setQuestionIndex(questionIndex + 1);
    collectData();
  };

  const handleQuestionBack = () => {
    setQuestionIndex(questionIndex - 1);
  };

  useEffect(() => {
    collectData();
    if (flowStep === 4) {
      const newSuccessMessage = [];
      doneQuestions.forEach(doneQuestion => {
        doneQuestion.answers.forEach(answer => {
          if (answer.lastMessageText && answer.isChecked) {
            newSuccessMessage.push(answer.lastMessageText);
          }
        });
      });
      setResultSuccessMessage(newSuccessMessage);
    }
  }, [flowStep, questionIndex, doneQuestions]);

  const toNextStep = () => {
    switch (flowStep) {
      case 1: {
        if (userName) {
          setFlowStep(2);
        }
        break;
      }
      case 2: {
        setFlowStep(3);
      }
    }
  };

  return (
    <div className={classes.home}>
      {existedSet && (
        <Box>
          {flowStep === 1 && (
            <Box className={classes.mainBox}>
              <Typography className={classes.mainText} variant="subtitle2">
                Hello! On questionary{" "}
                <span className={classes.title}>{selectedSet.title}</span>!
              </Typography>
              <Typography variant="subtitle2">Please add your name</Typography>
              <TextField
                label="Your name"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                multiline
                className={classes.welcomeMessage}
              >
                {userName}
              </TextField>

              <Box className={classes.editControls}>
                <Button
                  onClick={toNextStep}
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}
          {flowStep === 2 && (
            <Box className={classes.mainBox}>
              <Typography className={classes.mainText} variant="subtitle2">
                Press button to start questionary
              </Typography>
              <Box className={classes.editControls}>
                <Button
                  onClick={toNextStep}
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}
          {flowStep === 3 && (
            <Box className={classes.mainBox}>
              <QuestionUserItem
                onSubmit={handleQuestionNext}
                onBack={handleQuestionBack}
                data={questions[questionIndex]}
                doneData={
                  doneQuestions.length >= questionIndex - 1
                    ? doneQuestions[questionIndex]
                    : undefined
                }
                index={questionIndex}
              />
            </Box>
          )}
          {flowStep === 4 && (
            <Box className={classes.mainBox}>
              <Typography className={classes.mainText} variant="subtitle2">
                {selectedSet.successMessage}
              </Typography>
              {resultSuccessMessage.map((message, index) => (
                <Typography key={`successMessage${index}`} variant="subtitle2">{message}</Typography>
              ))}
              <Box className={classes.editControls}>
                <Button
                  onClick={handleFinish}
                  variant="contained"
                  color="primary"
                >
                  Finish
                </Button>
              </Box>
            </Box>
          )}
          {flowStep === 5 && (
            <Box className={classes.errorBox}>
              <Typography className={classes.mainText} variant="subtitle2">
                {selectedSet.deathMessage}
              </Typography>
              <Typography variant="subtitle2">{localDeathMessage}</Typography>
              <Box className={classes.editControls}>
                <Button
                  onClick={handleFinish}
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}
export default Home;
