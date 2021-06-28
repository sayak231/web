import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import home from "../assets/images/hme.jpg";

const Home = ({ history }) => {
  const matches = useMediaQuery("(min-width:1024px) and (max-width: 1920px");
  const useStyles = makeStyles((theme) => ({
    Container: {
      backgroundImage: theme.palette.mainBackgroundColor,
      height: "92.5vh",
      display: "flex",
    },
    leftSide: {
      padding: matches ? "100px 90px" : "200px 180px",
      height: "400px",
      width: matches ? "500px" : "900px",
      display: "flex",
      flexDirection: "column",
    },
    button: {
      color: "white",
      width: "300px",
      marginTop: "50px",
    },
    writeup: {
      color: "white",
      fontSize: matches ? "35px" : "45px",
    },
    image: {
      marginTop: matches ? "100px" : "125px",
      marginLeft: "100px",
    },
  }));
  const classes = useStyles();
  return (
    <Container
      maxWidth={false}
      component="div"
      className={classes.Container}
      disableGutters
    >
      <div className={classes.leftSide}>
        <span className={classes.writeup}>
          We're here to organize your Tasks.
          <br />
          <br />
          Do it Yourself
        </span>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push("/register")}
        >
          Get Started
        </Button>
      </div>
      <div>
        <img
          className={classes.image}
          height={matches ? "400" : "600"}
          width={matches ? "400" : "600"}
          src={home}
          alt="Tasks"
        />
      </div>
    </Container>
  );
};

export default Home;
