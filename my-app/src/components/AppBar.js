import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  subtitle: {
    color: "white",
    cursor: "pointer",
    marginRight: "10px"
  }
}));

export default function AppBarHeader({
  userData,
  setUserData,
  selectedSet,
  getSetRequest
}) {
  const [selectedSetUuid, setSelectedSetUuid] = useState("");
  const classes = useStyles();
  const { isAdmin } = userData;
  const history = useHistory();
  const location = useLocation();
  const isAdminPanel = location.pathname === "/admin-x";
  const isResults = location.pathname === "/results";
  const { search, pathname } = location;

  useEffect(() => {
    if (
      selectedSet &&
      selectedSet.uuid &&
      selectedSet.uuid !== selectedSetUuid
    ) {
      setSelectedSetUuid(selectedSet.uuid);
      history.push(`${pathname}?selectedSet=${selectedSet.uuid}`);
    }
  }, [selectedSet.uuid, selectedSetUuid, selectedSet, history, pathname]);

  if (search) {
    const parts = search.split("=");
    if (parts.length > 1 && parts[1] !== selectedSetUuid) {
      getSetRequest(parts[1]);
    }
  }

  const logout = () => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    history.push("/");
    setUserData({});
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isAdmin && (isAdminPanel || isResults) && (
            <Box>
              <Link
                to={selectedSetUuid ? `/?selectedSet=${selectedSetUuid}` : "/"}
                className={classes.subtitle}
                variant="h7"
              >
                Home
              </Link>
            </Box>
          )}
          {isAdmin && !isAdminPanel && (
            <Box>
              <Link
                to={
                  selectedSetUuid
                    ? `/admin-x?selectedSet=${selectedSetUuid}`
                    : "/admin-x"
                }
                className={classes.subtitle}
                variant="h7"
              >
                Admin
              </Link>
            </Box>
          )}
          {isAdmin && !isResults && (
            <Box>
              <Link
                to={
                  selectedSetUuid
                    ? `/results?selectedSet=${selectedSetUuid}`
                    : "/results"
                }
                className={classes.subtitle}
                variant="h7"
              >
                Results
              </Link>
            </Box>
          )}
          <Typography className={classes.title} variant="h6">
            Questionnaire
          </Typography>
          {userData.isAdmin && (
            <Typography
              onClick={logout}
              className={classes.subtitle}
              variant="h6"
            >
              Logout
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
