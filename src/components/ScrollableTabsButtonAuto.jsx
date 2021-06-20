import React, { useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import TaskBoard from "./TaskBoard.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  tabPanel: {
    backgroundColor: "transparent",
  },
  tab: {
    fontWeight: 700,
    letterSpacing: "0.25vw",
  },
  appBar: {
    backgroundColor: "transparent",
  },
}));

function TabPanel(props) {
  const classes = useStyles();

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

export default function ScrollableTabsButtonAuto({ members }) {
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
          // textColor="#0066eb"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {members?.map(({ id, firstname }, index) => (
            <Tab
              className={classes.tab}
              key={`member${id}-${firstname}`}
              label={firstname}
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
          <TaskBoard tasks={tasks_assigned} />
        </TabPanel>
      ))}
    </div>
  );
}
