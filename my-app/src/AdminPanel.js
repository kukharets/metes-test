import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Box, Button, Typography, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField/TextField";
import SignIn from "./components/SignIn";
import QuestionListItem from "./components/QuestionListItem";
import { useStyles } from "./components/styles";
import QuestionEditItem from "./components/QuestionEditItem";
import generateUuid from "./helpers/generateUuid";
import SetSelector from "./components/SetSelector";

export default function AdminPanel({
  userData,
  setUserData,
  selectedSet,
  setSelectedSet,
  userLoading
}) {
  const classes = useStyles();

  const [editWelcomeOpenState, setEditWelcomeOpenState] = useState(false);
  const [editSuccessOpenState, setEditSuccessOpenState] = useState(false);
  const [editDeathOpenState, setEditDeathOpenState] = useState(false);

  const [welcomeText, setWelcomeText] = useState("");
  const [deathMessage, setDeathText] = useState("");
  const [successMessage, setSuccessText] = useState("");

  const [addEditQuestion, setAddEditQuestion] = useState(false);

  const [sets, setSets] = useState([]);
  const [localQuestionsList, setLocalQuestionsList] = useState([]);
  const [changePositionState, setChangePositionState] = useState(false);

  useEffect(() => {
    if (userData.isAdmin) {
      getSets();
    }
  }, [userData.isAdmin]);

  useEffect(() => {
    setWelcomeText(selectedSet.welcomeMessage);
    setDeathText(selectedSet.deathMessage);
    setSuccessText(selectedSet.successMessage);
    setLocalQuestionsList(selectedSet.questions || []);
  }, [selectedSet]);

  const getSets = async () => {
    const snapshot = await firebase
      .firestore()
      .collection("sets")
      .get();
    setSets(snapshot.docs.map(doc => doc.data()));
  };

  const updateSet = async () => {
    await firebase
      .firestore()
      .collection("sets")
      .doc(selectedSet.uuid)
      .get()
      .then(res => {
        const newSet = res.data();
        const currentLocalSets = [...sets];
        const foundIndex = currentLocalSets.findIndex(
          x => x.uuid === newSet.uuid
        );
        currentLocalSets[foundIndex] = newSet;
        setSets(currentLocalSets);
        setSelectedSet(newSet);
      });
  };

  const handleAddEditSet = set => {
    const { uuid, title } = set;
    if (!title) {
      return;
    }
    const firestoreRef = firebase.firestore();
    const collection = firestoreRef.collection("sets");
    const uuidForSet = uuid || generateUuid();
    collection
      .doc(uuidForSet)
      .set({ title, uuid: uuidForSet }, { merge: true })
      .then(getSets());
  };

  const handleDeleteSet = set => {
    const documentRef = firebase.firestore().doc(`sets/${set.uuid}`);
    documentRef.delete().then(() => {
      getSets();
      setSelectedSet(false);
    });
  };

  const switchEditWelcomeOpenState = () => {
    setEditWelcomeOpenState(!editWelcomeOpenState);
  };

  const switchEditDeathOpenState = () => {
    setEditDeathOpenState(!editDeathOpenState);
  };

  const switchEditSuccessOpenState = () => {
    setEditSuccessOpenState(!editSuccessOpenState);
  };

  const handleAddEditQuestions = ({ index, data, isExisted }) => {
    setAddEditQuestion({ index, ...data, isExisted });
  };

  const cancelQuestEdit = () => {
    setAddEditQuestion(false);
  };

  const submitWelcomeMessage = () => {
    console.error(selectedSet);
    const { uuid } = selectedSet;
    if (uuid) {
      const firestoreRef = firebase.firestore();
      const collection = firestoreRef.collection("sets");
      collection
        .doc(uuid)
        .set({ welcomeMessage: welcomeText }, { merge: true })
        .then(() => {
          setEditWelcomeOpenState(false);
          updateSet();
        });
    }
  };

  const submitSuccessMessage = () => {
    const { uuid } = selectedSet;
    if (uuid) {
      const firestoreRef = firebase.firestore();
      const collection = firestoreRef.collection("sets");
      collection
        .doc(uuid)
        .set({ successMessage }, { merge: true })
        .then(() => {
          setEditSuccessOpenState(false);
          updateSet();
        });
    }
  };

  const submitDeathMessage = () => {
    const { uuid } = selectedSet;
    if (uuid) {
      const firestoreRef = firebase.firestore();
      const collection = firestoreRef.collection("sets");
      collection
        .doc(uuid)
        .set({ deathMessage }, { merge: true })
        .then(() => {
          setEditDeathOpenState(false);
          updateSet();
        });
    }
  };

  const handleCancelEditWelcomeMessage = () => {
    setEditWelcomeOpenState(false);
  };

  const handleCancelEditSuccessMessage = () => {
    setEditSuccessOpenState(false);
  };

  const handleCancelEditDeathMessage = () => {
    setEditDeathOpenState(false);
  };

  const submitAddEditQuestion = ({ data, index, isExisted }) => {
    const newLocalQuestionsList = [...localQuestionsList];
    if (isExisted) {
      newLocalQuestionsList[index] = data;
    } else {
      newLocalQuestionsList.splice(index, 0, data);
    }

    const { uuid } = selectedSet;
    if (uuid) {
      const firestoreRef = firebase.firestore();
      const collection = firestoreRef.collection("sets");
      collection
        .doc(uuid)
        .set({ questions: newLocalQuestionsList }, { merge: true })
        .then(() => {
          updateSet();
          setAddEditQuestion(false);
        });
    }
  };

  const handleChangePosition = ({ data, from, to }) => {
    if (to >= 0 && to < localQuestionsList.length) {
      setChangePositionState(true);
      const newLocalQuestionsList = [...localQuestionsList];
      const targetItem = newLocalQuestionsList[to];
      newLocalQuestionsList[to] = data;
      newLocalQuestionsList[from] = targetItem;
      const { uuid } = selectedSet;
      if (uuid) {
        const firestoreRef = firebase.firestore();
        const collection = firestoreRef.collection("sets");
        collection
          .doc(uuid)
          .set({ questions: newLocalQuestionsList }, { merge: true })
          .then(() => {
            setChangePositionState(false);
            updateSet();
          });
      }
    }
  };

  const handleQuestionDelete = (index) => {
    const newLocalQuestionsList = [...localQuestionsList];
    newLocalQuestionsList.splice(index, 1);
    const { uuid } = selectedSet;
    if (uuid) {
      const firestoreRef = firebase.firestore();
      const collection = firestoreRef.collection("sets");
      collection
        .doc(uuid)
        .set({ questions: newLocalQuestionsList }, { merge: true })
        .then(() => {
          updateSet();
        });
    }
  };

  const editInProcess =
    editDeathOpenState ||
    editSuccessOpenState ||
    editWelcomeOpenState ||
    addEditQuestion;

  return (
    <Box className="content">
      <SetSelector
        disabled={editInProcess}
        selectedSet={selectedSet}
        handleSelectSet={setSelectedSet}
        deleteSet={handleDeleteSet}
        addEditSet={handleAddEditSet}
        data={sets}
      />
      {!userData.isAdmin && !userLoading && (
        <SignIn setUserData={setUserData} />
      )}
      {userLoading && <CircularProgress />}
      {userData.isAdmin && (
        <Box className={classes.mainEditWindow}>
          <Box className={classes.sideBarList}>
            <Box>
              <Box className={classes.flexRow}>
                <Typography className={classes.subtitle}>
                  Welcome Message
                </Typography>
              </Box>
              <QuestionListItem
                onAddNewQuestion={switchEditWelcomeOpenState}
                data={{ question: selectedSet.welcomeMessage }}
              />
            </Box>
            <Box className={classes.questionsList}>
              <Box className={classes.flexRow}>
                <Typography className={classes.subtitle}>
                  Questions List
                </Typography>
                <Add
                  onClick={() => handleAddEditQuestions({ index: 0 })}
                  className={classes.editBtn}
                />
              </Box>
              {localQuestionsList.map((question, index) => (
                <Box key={`question${index}`}>
                  <QuestionListItem
                    onDeleteQuestion={handleQuestionDelete}
                    handleClick={() =>
                      handleAddEditQuestions({
                        data: question,
                        index,
                        isExisted: true
                      })
                    }
                    moveTo={handleChangePosition}
                    withControls={!addEditQuestion && !changePositionState}
                    onAddNewQuestion={handleAddEditQuestions}
                    index={index}
                    data={question}
                  />
                </Box>
              ))}
            </Box>
            <Box className={classes.lastMessages}>
              <Box>
                <Box className={classes.flexRow}>
                  <Typography className={classes.subtitle}>
                    Success Message
                  </Typography>
                </Box>
                <QuestionListItem
                  onAddNewQuestion={switchEditSuccessOpenState}
                  data={{ question: selectedSet.successMessage }}
                />
              </Box>
              <Box>
                <Box className={classes.flexRow}>
                  <Typography className={classes.subtitle}>
                    Death Message
                  </Typography>
                </Box>
                <QuestionListItem
                  onAddNewQuestion={switchEditDeathOpenState}
                  data={{ question: selectedSet.deathMessage }}
                />
              </Box>
            </Box>
          </Box>
          {editWelcomeOpenState && (
            <Box className={classes.editWindowQuestionWrapper}>
              <Box className={classes.editWindowItemWrapper}>
                <TextField
                  label="Welcome message"
                  value={welcomeText}
                  onChange={e => setWelcomeText(e.target.value)}
                  multiline
                  className={classes.welcomeMessage}
                >
                  {welcomeText}
                </TextField>
                <Box className={classes.editControls}>
                  <Button
                    onClick={handleCancelEditWelcomeMessage}
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitWelcomeMessage}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {editSuccessOpenState && (
            <Box className={classes.editWindowQuestionWrapper}>
              <Box className={classes.editWindowItemWrapper}>
                <TextField
                  label="Success message"
                  value={successMessage}
                  onChange={e => setSuccessText(e.target.value)}
                  multiline
                  className={classes.welcomeMessage}
                >
                  {successMessage}
                </TextField>
                <Box className={classes.editControls}>
                  <Button
                    onClick={handleCancelEditSuccessMessage}
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitSuccessMessage}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {editDeathOpenState && (
            <Box className={classes.editWindowQuestionWrapper}>
              <Box className={classes.editWindowItemWrapper}>
                <TextField
                  label="Death message"
                  value={deathMessage}
                  onChange={e => setDeathText(e.target.value)}
                  multiline
                  className={classes.welcomeMessage}
                >
                  {deathMessage}
                </TextField>
                <Box className={classes.editControls}>
                  <Button
                    onClick={handleCancelEditDeathMessage}
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitDeathMessage}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {addEditQuestion && (
            <QuestionEditItem
              handleCancelEdit={cancelQuestEdit}
              data={addEditQuestion}
              onSubmit={submitAddEditQuestion}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
