import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { getAccessTokenContext } from "../contexts/accessToken.js";
import { LOGOUT_, ME_ } from "../Queries";
import { getErrorMessage } from "../utils/getError.js";
import logo from "../assets/images/task.png";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundImage: theme.palette.mainBackgroundColor,
    minHeight: "7.5vh",
    zIndex: 999,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#FFFFFF",
  },
  title: {
    flexGrow: 1,
    color: "#FFFFFF",
    letterSpacing: "0.5vw",
  },
}));

const Header = ({ setIsLoggedIn }) => {
  const classes = useStyles();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { setAccessToken } = useContext(getAccessTokenContext());

  const [logout, { client, loading: logoutLoading, error: logoutError }] =
    useMutation(LOGOUT_);
  const [getMe, { data, loading, error }] = useLazyQuery(ME_, {
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    if (data && data?.me) {
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      setAccessToken("");
      client.stop();
      await client.resetStore();
      getMe();
      setIsLoggedIn(false);
      setAnchorEl(null);
    } catch (e) {
      console.error("logout err");
    }
  };

  return (
    <AppBar className={classes.appbar} position="sticky">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          edge="start"
          className={classes.menuButton}
          color="inherit"
        >
          <img src={logo} height="40" width="50" alt="DIY TASKS" />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          DIY TASKS
        </Typography>
        <Tabs
          value={
            location.pathname !== "/dashboard"
              ? location.pathname
              : !loading && !error && data && data?.me
              ? "/dashboard"
              : "/login"
          }
        >
          <Tab label="Home" value="/" component={Link} to="/" />
          <Tab
            label="Register"
            value="/register"
            component={Link}
            to="/register"
          />
          <Tab value="/login" label="Login" component={Link} to="/login" />
          {!loading && !error && data && data?.me && (
            <Tab
              value="/dashboard"
              label="Dashboard"
              component={Link}
              to="/dashboard"
            />
          )}
        </Tabs>
        {loading && <CircularProgress color="inherit" />}
        {!loading && !error && data && data?.me && (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{data.me.firstname}</MenuItem>
              <MenuItem component={Link} to={"/login"} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
        {!logoutLoading && logoutError && getErrorMessage(logoutError)}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
