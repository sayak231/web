import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import FacebookCircularProgress from "../components/FacebookCircularProgress.jsx";
import CreateDashboardModal from "../components/CreateDashboardModal.jsx";
import ErrorToast from "../components/ErrorToast.jsx";
import { getErrorMessage } from "../utils/getError";
import { CREATE_DASHBOARD } from "../Queries";

const DashboardList = ({
  selectedIndex,
  setSelectedIndex,
  getDash,
  getDashboardsLoading,
  getDashboardsError,
  getDashboardsData,
  refetch,
  handleDelete,
  deleteDashboardLoading,
  deleteDashboardError,
  deleteDashboardData,
}) => {
  const matches = useMediaQuery("(min-width:1024px) and (max-width: 1920px");

  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: "15vw",
      flexShrink: 0,
      height: "100%",
    },
    drawerPaper: {
      width: "15vw",
      backgroundImage: "linear-gradient(to bottom, #0066eb 21%, #7752ff 89%)",
      position: "relative",
      zIndex: 1,
    },
    toolbar: {
      textAlign: "center",
      height: "10vh",
      paddingTop: "3vh",
      color: "#FFFFFF",
      flexShrink: 0,
    },
    list: {
      padding: "5vh 0",
      flexGrow: 1,
      flexWrap: "nowrap",
      overflow: "auto",
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#dbe9f4",
        border: "4px solid transparent",
        borderRadius: "8px",
        backgroundClip: "padding-box",
      },
      "&::-webkit-scrollbar": {
        width: "16px",
      },
    },
    listItem: {
      color: "#FFFFFF",
      paddingTop: "0.5vh",
      paddingBottom: "0.5vh",
      display: "inline-flex",
      height: "7.5%",
    },
    listItemText: {
      width: "60%",
      fontSize: matches ? "13px" : "16px",
      paddingLeft: "5px",
    },
    chipContainer: {
      width: "20%",
    },
    Chip: {
      height: matches ? "18px" : "22px",
      width: matches ? "18px" : "22px",
      backgroundColor: "#417500",
      color: "#FFFFFF",
      borderRadius: "10px",
      padding: "3px",
      fontSize: matches ? "small" : "large",
    },
    button: {
      margin: theme.spacing(0),
      flexShrink: 0,
      width: "100%",
    },
    createButton: {
      width: "80%",
      fontSize: matches ? "12px" : "15px",
      margin: "10px auto",
    },
    drawerContent: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
  }));
  const classes = useStyles();

  const [dashboardName, setDashboardName] = useState("");
  const [dashboardDescription, setDashboardDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (dashboardName.length < 3 || dashboardDescription.length < 4) {
      setDisable(true);
    } else setDisable(false);
  }, [dashboardName, dashboardDescription]);

  useEffect(() => {
    if (selectedIndex === -1 && getDashboardsData?.getDashboards.length > 0) {
      setSelectedIndex(getDashboardsData?.getDashboards[0].id);
      getDash();
    } else if (getDashboardsData?.getDashboards.length === 0) {
      setSelectedIndex(-1);
      getDash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDashboardsData]);

  const [
    createDashboard,
    { loading: createDashboardLoading, error: createDashboardError },
  ] = useMutation(CREATE_DASHBOARD);

  const openModal = () => {
    setDashboardName("");
    setDashboardDescription("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDashboard = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIndex(id);
    getDash();
  };

  const handleCreate = async () => {
    try {
      const response = await createDashboard({
        variables: {
          name: dashboardName,
          description: dashboardDescription,
        },
      });

      if (response && response.data) {
        await refetch();
        if (!getDashboardsLoading) {
          closeModal();
          setSelectedIndex(response.data.createDashboard.id);
        }
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Container
          disableGutters
          className={classes.drawerContent}
          component="div"
        >
          <Container component="div" className={classes.toolbar}>
            <Typography variant={matches ? "subtitle1" : "h5"}>
              Dashboards
            </Typography>
          </Container>
          {!getDashboardsLoading ? (
            <>
              <Divider />
              <List disableGutters className={classes.list}>
                {getDashboardsData?.getDashboards.map(
                  ({ id, name, isCreated }) => (
                    <ListItem
                      disableGutters
                      className={classes.listItem}
                      selected={selectedIndex === id}
                      button
                      key={`dashboard${id}`}
                    >
                      <div
                        onClick={(e) => handleDashboard(e, id)}
                        className={classes.listItemText}
                      >
                        {name}
                      </div>

                      {isCreated && selectedIndex === id && (
                        <div className={classes.chipContainer}>
                          <IconButton
                            onClick={handleDelete}
                            aria-label="delete"
                            className={classes.button}
                          >
                            {deleteDashboardLoading ? (
                              <FacebookCircularProgress />
                            ) : (
                              <DeleteIcon fontSize="small" />
                            )}
                          </IconButton>
                        </div>
                      )}
                      <div className={classes.chipContainer}>
                        {isCreated && <DoneIcon className={classes.Chip} />}
                      </div>
                    </ListItem>
                  )
                )}
              </List>
              {deleteDashboardError && (
                <ErrorToast error={getErrorMessage(deleteDashboardError)} />
              )}
              {deleteDashboardData?.deleteDashboard === 0 && (
                <ErrorToast error="Could not delete dashboard !" />
              )}
              {getDashboardsData?.getDashboards.length === 0 ? (
                <div>No dashboards present yet</div>
              ) : (
                <Divider />
              )}
            </>
          ) : (
            <FacebookCircularProgress />
          )}
          <Button
            variant="contained"
            color="primary"
            size={matches ? "small" : "large"}
            className={classes.createButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={openModal}
          >
            {matches ? "Create" : "Create One !"}
          </Button>
          {getDashboardsError && (
            <ErrorToast error={getErrorMessage(getDashboardsError)} />
          )}
        </Container>
      </Drawer>
      <CreateDashboardModal
        open={showModal}
        close={closeModal}
        create={handleCreate}
        setDashboardName={setDashboardName}
        setDashboardDescription={setDashboardDescription}
        disabled={disable}
        error={
          createDashboardError ? getErrorMessage(createDashboardError) : null
        }
        loading={createDashboardLoading || getDashboardsLoading}
      />
    </>
  );
};

export default DashboardList;
