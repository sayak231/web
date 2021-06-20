import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    minHeight: "40vh",
    width: "30vw",
    backgroundImage: "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)",
  },
  statusHeader: {
    fontWeight: 500,
    color: "white",
    textAlign: "center",
    backgroundImage: "linear-gradient(to bottom, #0066eb 21%, #7752ff 89%)",
    padding: "1vh 0",
  },
}));

const TaskContainer = ({ status }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h6" className={classes.statusHeader}>
        {status}
      </Typography>
      <Divider />
    </Paper>
  );
};

export default TaskContainer;
