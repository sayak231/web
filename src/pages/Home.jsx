import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundImage: theme.palette.mainBackgroundColor,
    height: "92vh",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container
      maxWidth={false}
      component="div"
      className={classes.Container}
      disableGutters
    >
      Welcome
    </Container>
  );
};

export default Home;
