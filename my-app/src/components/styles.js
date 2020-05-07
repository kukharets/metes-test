import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
    padding: "3%"
  },
  editWindowItemWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "25px 25px 100px",
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: "#efefef",
    minWidth: "70%",
    minHeight: "20%"
  },
  editWindowQuestion: {
    position: "relative",
    width: "100%",
    marginBottom: "20px"
  },
  answerEditField: {
    position: "relative",
    width: "100%",
    marginBottom: "20px"
  },
  addNewAnswerButton: {
    fontSize: "9px",
    marginRight: "20px"
  },
  trash: {
    height: "15px"
  },
  addNewConditionButton: {
    fontSize: "9px",
    marginRight: "20px"
  },
  answerEditSubMenu: {
    position: "absolute",
    right: "0",
    bottom: "-24px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  welcomeMessage: {
    width: "100%"
  },
  conditionMessageContainer: {
    position: "relative",
    paddingLeft: "50px"
  },
  textDelete: {
    position: "absolute",
    right: "0",
    bottom: "5px",
    cursor: "pointer",
    color: "gray"
  },
  sideBarList: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
    marginTop: "10px",
    position: "absolute",
    right: "5px",
    bottom: "5px"
  },
  questionsList: {
    marginTop: "10px"
  }
}));
