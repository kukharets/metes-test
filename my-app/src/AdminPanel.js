import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { Edit, Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField/TextField";
import SignIn from "./components/SignIn";
import QuestionListItem from "./components/QuestionListItem";
import { useStyles } from "./components/styles";
import QuestionEditItem from "./components/QuestionEditItem";
import generateUuid from "./helpers/generateUuid";
import SetSelector from "./components/SetSelector";

export default function AdminPanel({ userData, setUserData }) {
  const classes = useStyles();
  const [editWelcomeOpenState, setEditWelcomeOpenState] = useState(false);
  const [addEditQuestion, setAddEditQuestion] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [saveSetState, setSaveSetState] = useState(false);
  const [localUuid, setLocalUuid] = useState("");
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = React.useState({});
  const [localQuestionsList, setLocalQuestionsList] = useState([]);
  const [changePositionState, setChangePositionState] = useState(false);


  console.warn("ADMIN PANEL addEditQuestion", addEditQuestion)
  console.warn("ADMIN PANEL localQuestionsList", localQuestionsList)

  const getSets = async () => {
    const snapshot = await firebase
      .firestore()
      .collection("sets")
      .get();
    setSets(snapshot.docs.map(doc => doc.data()));
  };

  const handleAddEditSet = set => {
    console.log(set);
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
    });
  };

  useEffect(() => {
    if (userData.isAdmin) {
      getSets();
    }
  }, [userData.isAdmin]);

  useEffect(() => {
    setWelcomeText(selectedSet.welcomeMessage);
    setLocalQuestionsList(selectedSet.questions || []);
  }, [selectedSet]);

  const swichEditWelcomeOpenState = () => {
    setEditWelcomeOpenState(!editWelcomeOpenState);
  };

  const handleAddEditQuestions = ({index, data, isExisted}) => {
    console.error('handleAddEditQuestions', index, data)
    setAddEditQuestion({index, ...data, isExisted});
  };

  const cancelQuestEdit = () => {
    console.warn('cancelQuestEdit')
    setAddEditQuestion(false);
  };

  const onAddNewQuestion = (index) => {

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
          getSets();
        });
    }
  };

  const submitAddEditQuestion = ({data, index, isExisted}) => {
    const newLocalQuestionsList = [...localQuestionsList];
    console.error('submitAddEditQuestion', data, index, isExisted)
    if (isExisted) {
      newLocalQuestionsList[index] = data;
    } else {
      newLocalQuestionsList.splice(index, 0, data);
    }

    const { uuid } = selectedSet;
    if (uuid) {
      const firestoreRef = firebase.firestore();
      const collection = firestoreRef.collection("sets");
      collection.doc(uuid).set({ questions: newLocalQuestionsList }, {merge: true}).then(() => {getSets(); setAddEditQuestion(false)})
  //      collection.doc(uuid).set({...selectedSet, questions: newLocalQuestionsList }).then(getSets())

    }
  };

  const handleChangePosition = ({data, from, to}) => {
    if (to > 0 && to < localQuestionsList.length - 1) {
      setChangePositionState(true);
      const newLocalQuestionsList = [...localQuestionsList];
      const targetItem = newLocalQuestionsList[to];
      newLocalQuestionsList[to] = data;
      newLocalQuestionsList[from] = targetItem;
      console.error('handleChangePosition', newLocalQuestionsList)
      const { uuid } = selectedSet;
      if (uuid) {
        const firestoreRef = firebase.firestore();
        const collection = firestoreRef.collection("sets");
        collection.doc(uuid).set({ questions: newLocalQuestionsList }, {merge: true}).then((res) => {
          console.log('res', res, )
          setChangePositionState(false); getSets()})
      }
    }

  }

  const addQuestion = () => {
    const firestoreRef = firebase.firestore();
    const collection = firestoreRef.collection("questions");
    collection
      .doc("welcomeMessage")
      .set({ message: welcomeText }, { merge: true });
  };

  const editData = () => {
    const firestoreRef = firebase.firestore();

    const collection = firestoreRef.collection("basic");
    const document1 = collection.doc("docrules");

    document1
      .update({
        question: "What is your age?",
        state: "CA1112",
        country: "USA"
      })
      .catch(e => console.warn(e));
  };

  const addData = () => {
    const firestoreRef = firebase.firestore();

    const collection = firestoreRef.collection("basic");

    collection
      .doc("Question2")
      .set({
        name: "Los Angeles245",
        state: "CA",
        country: "USA"
      })
      .catch((e, data) => console.log(data, e.message));
  };

  return (
    <Box className="content">
      <SetSelector
        selectedSet={selectedSet}
        handleSelectSet={setSelectedSet}
        deleteSet={handleDeleteSet}
        addEditSet={handleAddEditSet}
        data={sets}
        saveSetState={saveSetState}
      />
      {!userData.isAdmin && <SignIn setUserData={setUserData} />}
      {userData.isAdmin && (
        <Box className={classes.mainEditWindow}>
          <Box className={classes.sideBarList}>
            <Box>
              <Box className={classes.flexRow}>
                <Typography className={classes.subtitle}>
                  Welcome Message
                </Typography>
                <Edit
                  onClick={swichEditWelcomeOpenState}
                  className={classes.editBtn}
                />
              </Box>
              <QuestionListItem data={{question: selectedSet.welcomeMessage}} />
            </Box>
            <Box className={classes.questionsList}>
              <Box className={classes.flexRow}>
                <Typography className={classes.subtitle}>
                  Questions List
                </Typography>
                <Add
                  onClick={() => handleAddEditQuestions({index: 0})}
                  className={classes.editBtn}
                />
              </Box>
              {localQuestionsList.map((question, index) => (
                <QuestionListItem handleClick={() => handleAddEditQuestions({data: question, index, isExisted: true})} moveTo={handleChangePosition} withControls={!addEditQuestion && !changePositionState} onAddNewQuestion={handleAddEditQuestions} index={index} data={question} />
              ))}
            </Box>
            <Box></Box>
          </Box>
          {editWelcomeOpenState && (
            <Box className={classes.editWindowQuestionWrapper}>
              <Box className={classes.editWindowItemWrapper}>
                <TextField
                  value={welcomeText}
                  onChange={e => setWelcomeText(e.target.value)}
                  multiline
                  className={classes.welcomeMessage}
                >
                  {welcomeText}
                </TextField>
                <Button
                  sizeSmall
                  onClick={submitWelcomeMessage}
                  className={classes.submitButton}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Box>
            </Box>
          )}
          {addEditQuestion && (
            <QuestionEditItem  handleCancelEdit={cancelQuestEdit} data={addEditQuestion} onSubmit={submitAddEditQuestion} />
          )}
        </Box>
      )}
    </Box>
  );
}
