import { Box, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import TextField from "@material-ui/core/TextField/TextField";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";

export default function QuestionEditItem({
  data = {},
  onSubmit,
  handleCancelEdit
}) {
  const classes = useStyles();
  const { question, answers = [{}],  index, isExisted } = data;
  const [questionTextLocal, setQuestionTextLocal] = useState(question);
  const [answersListLocal, setAnswersListLocal] = useState(answers);

  const handleSubmit = () => {
    const data = { question: questionTextLocal, answers: answersListLocal };
    onSubmit({ data, index: index || 0, isExisted });
  };

  useEffect(() => {
    const { question, answers = [] } = data;
    setQuestionTextLocal(question);
    setAnswersListLocal(answers);
  }, [data]);

  const addNewAnswer = index => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal.splice(index + 1, 0, { answerText: "" });
    setAnswersListLocal(newAnsersListLocal);
  };

  const deleteAnswer = index => {
    const newAnswersListLocal = [...answersListLocal];
    newAnswersListLocal.splice(index, 1);
    setAnswersListLocal(newAnswersListLocal);
  };

  const handleChangeAnswerText = ({ index, value }) => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].answerText = value;
    setAnswersListLocal(newAnsersListLocal);
  };

  const addConditionMessage = index => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].conditionMessage = true;
    setAnswersListLocal(newAnsersListLocal);
  };

  const deleteLastMessage = index => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].conditionMessage = false;
    newAnsersListLocal[index].lastMessageText = "";
    setAnswersListLocal(newAnsersListLocal);
  };

  const handleChangeLastMessageText = ({ index, value }) => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].lastMessageText = value;
    setAnswersListLocal(newAnsersListLocal);
  };

  const addDeathMessage = index => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].deathMessage = true;
    setAnswersListLocal(newAnsersListLocal);
  };

  const deleteDeathMessage = index => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].deathMessage = false;
    newAnsersListLocal[index].deathMessageText = "";
    setAnswersListLocal(newAnsersListLocal);
  };

  const handleChangeDeathMessageText = ({ index, value }) => {
    const newAnsersListLocal = [...answersListLocal];
    newAnsersListLocal[index].deathMessageText = value;
    setAnswersListLocal(newAnsersListLocal);
  };

  return (
    <Box className={classes.editWindowQuestionWrapper}>
      <Box className={classes.editWindowItemWrapper}>
        <Box className={classes.editWindowQuestion}>
          <TextField
            label="Question"
            value={questionTextLocal}
            onChange={e => setQuestionTextLocal(e.target.value)}
            multiline
            className={classes.welcomeMessage}
          >
            {questionTextLocal}
          </TextField>
          <Box className={classes.answerEditSubMenu}>
            <Button
              size="small"
              onClick={() => addNewAnswer(-1)}
              className={classes.addNewAnswerButton}
              variant="contained"
              color="primary"
            >
              + new answer bellow
            </Button>
          </Box>
        </Box>
        {answersListLocal.map((answer, index) => (
          <Box key={`answer-${index}`} className={classes.answerEditField}>
            <TextField
              label={`Answer ${index + 1}`}
              value={answer.answerText}
              onChange={e =>
                handleChangeAnswerText({ value: e.target.value, index })
              }
              multiline
              className={classes.welcomeMessage}
            >
              {answer.answerText}
            </TextField>
            {answer.conditionMessage && (
              <Box className={classes.conditionMessageContainer}>
                <TextField
                  fullWidth
                  label={`Success message for answer ${index + 1}`}
                  value={answer.lastMessageText}
                  onChange={e =>
                    handleChangeLastMessageText({
                      value: e.target.value,
                      index
                    })
                  }
                  multiline
                  className={classes.conditionMessage}
                >
                  {answer.lastMessageText}
                </TextField>
                <Delete
                  onClick={() => deleteLastMessage(index)}
                  className={classes.textDelete}
                />
              </Box>
            )}
            {answer.deathMessage && (
              <Box className={classes.conditionMessageContainer}>
                <TextField
                  fullWidth
                  label={`Death message for answer ${index + 1}`}
                  value={answer.deathMessageText}
                  onChange={e =>
                    handleChangeDeathMessageText({
                      value: e.target.value,
                      index
                    })
                  }
                  multiline
                  className={classes.conditionMessage}
                >
                  {answer.deathMessageText}
                </TextField>
                <Delete
                  onClick={() => deleteDeathMessage(index)}
                  className={classes.textDelete}
                />
              </Box>
            )}
            <Box className={classes.answerEditSubMenu}>
              {!answer.deathMessage && (
                <Button
                  size="small"
                  onClick={() => addDeathMessage(index)}
                  className={classes.addNewConditionButton}
                  variant="contained"
                  color="secondary"
                >
                  + sudden death message
                </Button>
              )}
              {!answer.conditionMessage && (
                <Button
                  size="small"
                  onClick={() => addConditionMessage(index)}
                  className={classes.addNewConditionButton}
                  variant="contained"
                  color="primary"
                >
                  + last message condition
                </Button>
              )}
              <Button
                size="small"
                onClick={() => addNewAnswer(index)}
                className={classes.addNewAnswerButton}
                variant="contained"
                color="primary"
              >
                + new answer bellow
              </Button>
              <Button
                size="small"
                onClick={() => deleteAnswer(index)}
                className={classes.addNewAnswerButton}
                variant="contained"
                color="primary"
              >
                <Delete className={classes.trash} />
              </Button>
            </Box>
          </Box>
        ))}
        <Box className={classes.editControls}>
          <Button
            onClick={handleCancelEdit}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
