import React, { useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import TaskBoard from "./TaskBoard.jsx";

function TabPanel(props) {
  const useStylesTabPanel = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
      flex: "1 1 auto",
    },
    tabPanel: {
      backgroundColor: "transparent",
    },
  }));
  const classes = useStylesTabPanel();

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.tabPanel} component="div" m={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto({
  creator,
  members,
  loggedInUserId,
  open,
  dashboard,
  getDash,
}) {
  const matches = useMediaQuery("(min-width:1024px) and (max-width: 1500px");
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
      flex: "1 1 auto",
    },
    tab: {
      fontWeight: 700,
      letterSpacing: "0.25vw",
    },
    appBar: {
      backgroundColor: "transparent",
    },
    button: {
      margin: theme.spacing(1),
      fontSize: matches ? "12px" : "15px",
      backgroundImage: "linear-gradient(to bottom, #0066eb 21%, #7752ff 89%)",
    },
  }));
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {members?.map(({ id, firstname }, index) => (
            <Tab
              className={classes.tab}
              key={`member${id}-${firstname}`}
              label={loggedInUserId === id ? "ME" : firstname}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {members?.map(({ id, firstname, tasks_assigned }, index) => (
        <TabPanel
          key={`tabPanel${id}-${firstname}`}
          value={value}
          index={index}
        >
          {loggedInUserId === id && parseInt(loggedInUserId) !== creator && (
            <Button
              variant="contained"
              color="primary"
              size={matches ? "small" : "medium"}
              className={classes.button}
              onClick={open}
              startIcon={<NoteAddIcon />}
            >
              Create Task
            </Button>
          )}
          <TaskBoard
            loggedInUserId={loggedInUserId}
            creator={creator}
            tasks={tasks_assigned}
            dashboard={dashboard}
            getDash={getDash}
          />
        </TabPanel>
      ))}
    </div>
  );
}
