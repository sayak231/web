import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    mainBackgroundColor:
      "linear-gradient(110deg, rgba(119,194,246,1) 0%, rgba(252,2,2,1) 0%, rgba(0,119,185,1) 0%)",
    spinner: {
      main: "#FF9B1A",
    },
    spinnerBackground: {
      default:
        "radial-gradient(circle, #136af2, #0083f9, #0099f9, #00abf3, #12bceb)",
    },
  },
});

export default theme;
