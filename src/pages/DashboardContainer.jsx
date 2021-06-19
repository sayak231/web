import React from "react";
import DashboardList from "./DashboardList.jsx";
import DashPage from "./DashPage.jsx";
import { GET_DASHBOARD } from "../Queries";
import { useLazyQuery } from "@apollo/client";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  Container: {
    backgroundColor: "#dbe9f4",
    height: "92.5vh",
    display: "flex",
  },
}));

const DashboardContainer = () => {
  const classes = useStyles();

  const [getDash, { loading, error, data }] = useLazyQuery(GET_DASHBOARD, {
    fetchPolicy: "network-only",
  });

  return (
    <Container
      maxWidth={false}
      component="div"
      className={classes.Container}
      disableGutters
    >
      <DashboardList getDash={getDash} />
      <DashPage getDash={getDash} loading={loading} error={error} data={data} />
    </Container>
  );
};

export default DashboardContainer;
