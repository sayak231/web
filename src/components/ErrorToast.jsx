import React, { useState } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorToast = ({ error }) => {
  const [open, setOpen] = useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <Snackbar open={open}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};
export default ErrorToast;
