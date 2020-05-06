import React from "react";
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

export default function AppBarHeader({ userData, setUserData }) {
  const classes = useStyles();
  const { isAdmin } = userData;
  const location = useLocation();
  const history = useHistory();
  const isAdminPanel = location.pathname === "/admin-x";

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
              <Link to="/" className={classes.subtitle} variant="h7" noWrap>
                Home
              </Link>
            </Box>
          )}
          {isAdmin && !isAdminPanel && (
            <Box>
              <Link
                to="/admin-x"
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
