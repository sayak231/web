import React from "react";

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

const TaskCard = ({ task }) => {
  const classes = useStyles();

  const { name, description, assigned_to } = task;

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
      <CardActions className={classes.icon} disableSpacing>
        <IconButton aria-label="add to favorites">
          <EditTwoToneIcon color="primary" />
        </IconButton>
        <IconButton aria-label="share">
          <DeleteForeverRoundedIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
