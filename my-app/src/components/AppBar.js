import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
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
    cursor: "pointer"
  }
}));

export default function AppBarHeader({
  userData,
  setUserData,
  selectedSet,
  getSetRequest
}) {
  console.warn("selected!!!", selectedSet);
  const [selectedSetUuid, setSelectedSetUuid] = useState("");
  const classes = useStyles();
  const { isAdmin } = userData;
  const history = useHistory();
  const location = useLocation();
  const isAdminPanel = location.pathname === "/admin-x";
  const { search, pathname } = location;

  useEffect(() => {
    console.warn("selected!!!!!", selectedSet, location, history);

    if (selectedSet && selectedSet.uuid && (selectedSet.uuid != selectedSetUuid)) {
      setSelectedSetUuid(selectedSet.uuid);
      history.push(`${pathname}?selectedSet=${selectedSet.uuid}`);
    }
  }, selectedSet.uuid);

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
          {isAdmin && isAdminPanel && (
            <Box>
              <Link
                to={selectedSetUuid ? `/?selectedSet=${selectedSetUuid}` : "/"}
                className={classes.subtitle}
                variant="h7"
                noWrap
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
                noWrap
              >
                Admin
              </Link>
            </Box>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            Questionnaire
          </Typography>
          {userData.isAdmin && (
            <Typography
              onClick={logout}
              className={classes.subtitle}
              variant="h6"
              noWrap
            >
              Logout
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
