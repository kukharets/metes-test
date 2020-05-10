import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import DatePicker from "react-datepicker";
import SignIn from "../components/SignIn";
import QuestionListItem from "../components/QuestionListItem";
import { useStyles } from "../components/styles";
import SetSelector from "../components/SetSelector";

import "react-datepicker/dist/react-datepicker.css";
import dateParser from "../helpers/dateParser";
import ResultItem from "../components/ResultItem";

export default function Results({
  userData,
  setUserData,
  selectedSet,
  setSelectedSet,
  userLoading
}) {
  const classes = useStyles();

  const [sets, setSets] = useState([]);
  const [localDoneResultsList, setLocalDoneResultsList] = useState([]);
  const [localDoneResultItem, setLocalDoneResultItem] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const getSets = async () => {
    const snapshot = await firebase
      .firestore()
      .collection("sets")
      .get();
    setSets(snapshot.docs.map(doc => doc.data()));
  };

  const getResults = async () => {
    if (selectedSet.uuid) {
      const snapshot = await firebase
        .firestore()
        .collection("results")
        .where("date", "==", dateParser(startDate))
        .where("setUuid", "==", selectedSet.uuid)
        .get();
      setLocalDoneResultsList(snapshot.docs.map(doc => doc.data()));
    }
  };

  useEffect(() => {
    if (userData.isAdmin) {
      getSets();
    }
  }, [userData.isAdmin]);

  useEffect(() => {
    getResults();
    setLocalDoneResultItem(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSet, startDate, userData.isAdmin]);

  const handleOpenResultItem = ({ data }) => {
    setLocalDoneResultItem(data);
  };

  const handleChangeDate = date => {
    setStartDate(date);
  };

  return (
    <Box className="content">
      {userData.isAdmin && !userLoading && (
        <SetSelector
          disabled={false}
          selectedSet={selectedSet}
          handleSelectSet={setSelectedSet}
          data={sets}
          withoutControls
        />
      )}
      {!userData.isAdmin && !userLoading && (
        <SignIn setUserData={setUserData} />
      )}
      {userLoading && <CircularProgress />}
      {userData.isAdmin && (
        <Box className={classes.mainEditWindow}>
          <Box className={classes.sideBarList}>
            <Box className={classes.questionsList}>
              <Box className={classes.datePicker}>
                <Typography className={classes.subtitle}>Date</Typography>
                <DatePicker selected={startDate} onChange={handleChangeDate} />
              </Box>
              <Box className={classes.flexRow}>
                <Typography className={classes.subtitle}>
                  Results List
                </Typography>
              </Box>
              {localDoneResultsList.map((result, index) => (
                <Box key={`question${index}`}>
                  <QuestionListItem
                    onAddNewQuestion={() =>
                      handleOpenResultItem({
                        data: result,
                        index
                      })
                    }
                    withControls={false}
                    index={index}
                    data={{ question: result.userName }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          {localDoneResultItem && <ResultItem data={localDoneResultItem} />}
        </Box>
      )}
    </Box>
  );
}
