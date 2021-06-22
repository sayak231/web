import React from "react";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import FacebookCircularProgress from "./FacebookCircularProgress.jsx";
import ErrorToast from "../components/ErrorToast.jsx";
import { DELETE_TASK } from "../Queries.js";
import { getErrorMessage } from "../utils/getError";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    boxShadow: "inset 0px 0px 20px -7px #888888",
    margin: "2vh 2vh",
    backgroundImage: "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)",
  },
  avatar: {
    backgroundColor: "red",
  },
  icon: {
    float: "right",
    height: "5vh",
  },
}));

const TaskCard = ({ task, loggedInUserId, creator, dashboard, getDash }) => {
  const classes = useStyles();

  const { id, name, description, assigned_to } = task;

  const [deleteTask, { loading, error }] = useMutation(DELETE_TASK, {
    variables: { id: parseInt(id), dashboard: parseInt(dashboard) },
  });

  const handleDelete = async () => {
    try {
      const response = await deleteTask();
      if (response && response.data) {
        getDash({ variables: { id: parseInt(dashboard) } });
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        title={name}
        subheader={`${assigned_to.firstname} ${assigned_to.lastname}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      {(parseInt(loggedInUserId) === creator ||
        loggedInUserId === assigned_to.id) && (
        <CardActions className={classes.icon} disableSpacing>
          <IconButton aria-label="add to favorites">
            <EditTwoToneIcon color="primary" />
          </IconButton>
          <IconButton onClick={handleDelete} aria-label="share">
            {loading ? (
              <FacebookCircularProgress />
            ) : (
              <DeleteForeverRoundedIcon color="error" />
            )}
          </IconButton>
        </CardActions>
      )}
      {error && <ErrorToast error={getErrorMessage(error)} />}
    </Card>
  );
};

export default TaskCard;
