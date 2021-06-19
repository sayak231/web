import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./utils/theme";
import App from "./App";
import { AccessTokenContextProvider } from "./contexts/accessToken.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccessTokenContextProvider>
        <App />
      </AccessTokenContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
