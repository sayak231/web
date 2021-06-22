import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Copyright from "./Copyright.jsx";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  inputAdornment: {
    backgroundImage: theme.palette.mainBackgroundColor,
  },
  container: {
    height: "92.5vh",
    width: "100vw",
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "40%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  circularProgress: {
    color: "#3f51b5",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = ({ loading, handleSubmit, graphQlError }) => {
  const classes = useStyles();

  const schema = yup.object().shape({
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Number and one special case Character"
      )
      .required("Required"),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container className={classes.container} component="main" maxWidth={false}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={({ email, password, firstname, lastname }) => {
            handleSubmit(email, password, firstname, lastname);
            handleClick();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className={classes.inputAdornment}
                        position="start"
                      >
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.firstname && touched.firstname && true}
                  helperText={
                    errors.firstname && touched.firstname && errors.firstname
                  }
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className={classes.inputAdornment}
                        position="start"
                      >
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.lastname && touched.lastname && true}
                  helperText={
                    errors.lastname && touched.lastname && errors.lastname
                  }
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className={classes.inputAdornment}
                        position="start"
                      >
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.email && touched.email && true}
                  helperText={errors.email && touched.email && errors.email}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={errors.password && touched.password && true}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress className={classes.circularProgress} />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
        {graphQlError && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {graphQlError}
            </Alert>
          </Snackbar>
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
