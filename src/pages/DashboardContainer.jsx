import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import DashboardList from "./DashboardList.jsx";
// import DashPage from "./DashPage.jsx";
import DashPage1 from "./DashPage1.jsx";
import { GET_DASHBOARD } from "../Queries";

const useStyles = makeStyles(() => ({
  Container: {
    backgroundColor: "#dbe9f4",
    height: "92.5vh",
    display: "flex",
  },
}));

const DashboardContainer = () => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (selectedIndex !== -1) {
      getDash();
    }
  }, [selectedIndex]);

  const [getDash, { loading, error, data }] = useLazyQuery(GET_DASHBOARD, {
    variables: { id: parseInt(selectedIndex) },
    fetchPolicy: "network-only",
  });

  return (
    <Container
      maxWidth={false}
      component="div"
      className={classes.Container}
      disableGutters
    >
      <DashboardList
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        getDash={getDash}
      />
      <DashPage1
        getDash={getDash}
        getDashboardLoading={loading}
        getDashboardError={error}
        getDashboardData={
          data?.getDashboardDetails ? data.getDashboardDetails : false
        }
      />
    </Container>
  );
};

export default DashboardContainer;
