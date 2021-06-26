import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import DashboardList from "./DashboardList.jsx";
// import DashPage from "./DashPage.jsx";
import DashPage1 from "./DashPage1.jsx";
import { GET_DASHBOARDS, GET_DASHBOARD, DELETE_DASHBOARD } from "../Queries";

const useStyles = makeStyles(() => ({
  Container: {
    backgroundColor: "#dbe9f4",
    height: "92vh",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const [getDash, { loading, error, data }] = useLazyQuery(GET_DASHBOARD, {
    variables: { id: parseInt(selectedIndex) },
    fetchPolicy: "network-only",
  });

  const {
    loading: getDashboardsLoading,
    error: getDashboardsError,
    data: getDashboardsData,
    refetch,
  } = useQuery(GET_DASHBOARDS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteDashboard,
    {
      loading: deleteDashboardLoading,
      error: deleteDashboardError,
      data: deleteDashboardData,
    },
  ] = useMutation(DELETE_DASHBOARD);

  const handleDelete = async () => {
    try {
      const response = await deleteDashboard({
        variables: {
          id: parseInt(selectedIndex),
        },
      });
      if (response && response.data) {
        if (response.data.deleteDashboard === parseInt(selectedIndex)) {
          setSelectedIndex(getDashboardsData?.getDashboards[0].id);
          await refetch();
        }
      }
    } catch (e) {
      console.error("error", e);
    }
  };

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
        getDashboardsLoading={getDashboardsLoading}
        getDashboardsError={getDashboardsError}
        getDashboardsData={getDashboardsData}
        refetch={refetch}
        handleDelete={handleDelete}
        deleteDashboardLoading={deleteDashboardLoading}
        deleteDashboardError={deleteDashboardError}
        deleteDashboardData={deleteDashboardData}
      />
      <DashPage1
        getDash={getDash}
        getDashboardLoading={loading}
        getDashboardsLoading={getDashboardsLoading}
        getDashboardError={error}
        getDashboardData={
          data?.getDashboardDetails ? data.getDashboardDetails : false
        }
        deleteDashboardLoading={deleteDashboardLoading}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default DashboardContainer;
