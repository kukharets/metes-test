import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField/TextField";
import SignIn from "./components/SignIn";
import QuestionListItem from "./components/QuestionListItem";

const useStyles = makeStyles(theme => ({
  mainEditWindow: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    positiom: "relative",
    padding: "30px"
  },
  editWindowQuestionWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    padding: "10%"
  },
  editWindowQuestion: {
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: "#efefef",
    minWidth: "70%",
    minHeight: "20%"
  },
  welcomeMessage: {
    width: "100%"
  },
  sideBarList: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    width: "200px"
  },
  subtitle: {
    fontSize: "12px",
    color: "gray"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  editBtn: {
    height: "17px",
    color: "blue",
    cursor: "pointer"
  },
  submitButton: {
    marginTop: "10px"
  }
}));

export default function AdminPanel({ userData, setUserData }) {
  const classes = useStyles();
  const [editWelcomeOpenState, setEditWelcomeOpenState] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    const firestoreRef = firebase.firestore();
    const collection = firestoreRef.collection("basic");
    collection
      .doc("welcomeMessage")
      .get()
      .then(doc => setWelcomeText(doc.data().message));
  }, []);

  const swichEditWelcomeOpenState = () => {
    setEditWelcomeOpenState(!editWelcomeOpenState);
  };

  const submitWelcomeMessage = () => {
    const firestoreRef = firebase.firestore();
    const collection = firestoreRef.collection("basic");
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
      {!userData.isAdmin && <SignIn setUserData={setUserData} />}
      {userData.isAdmin && (
        <Box className={classes.mainEditWindow}>
          <Box className={classes.sideBarList}>
            <Box>
              <Box className={classes.flexRow}>
                <Typography className={classes.subtitle}>
                  'Welcome Message'
                </Typography>
                <Edit
                  onClick={swichEditWelcomeOpenState}
                  className={classes.editBtn}
                />
              </Box>
              {welcomeText && (
                <QuestionListItem question={welcomeText} />
              )}
            </Box>
            <Box></Box>
            <Box></Box>
          </Box>
          {editWelcomeOpenState && (
            <Box className={classes.editWindowQuestionWrapper}>
              <Box className={classes.editWindowQuestion}>
                <TextField
                  value={welcomeText}
                  onChange={e => setWelcomeText(e.target.value)}
                  multiline
                  className={classes.welcomeMessage}
                >
                  {welcomeText}
                </TextField>
                <Button
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
        </Box>
      )}
    </Box>
  );
}
