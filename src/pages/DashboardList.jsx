import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import FacebookCircularProgress from "../components/FacebookCircularProgress.jsx";
import CreateDashboardModal from "../components/CreateDashboardModal.jsx";
import ErrorToast from "../components/ErrorToast.jsx";
import { getErrorMessage } from "../utils/getError";
import { CREATE_DASHBOARD } from "../Queries";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "15vw",
    flexShrink: 0,
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
  },
  list: {
    padding: "5vh 0",
  },
  listItem: {
    color: "#FFFFFF",
    paddingTop: "0.5vh",
    paddingBottom: "0.5vh",
  },
  Chip: {
    backgroundColor: "#417500",
    color: "#FFFFFF",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

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
    if (getDashboardsData?.getDashboards.length > 0) {
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
        <div className={classes.toolbar}>
          <Typography variant="h5">Dashboards</Typography>
        </div>
        {!getDashboardsLoading ? (
          <>
            <Divider />
            <List className={classes.list}>
              {getDashboardsData?.getDashboards.map(
                ({ id, name, isCreated }) => (
                  <ListItem
                    className={classes.listItem}
                    selected={selectedIndex === id}
                    button
                    key={`dashboard${id}`}
                  >
                    <ListItemText
                      onClick={(e) => handleDashboard(e, id)}
                      className={classes.listItemText}
                      primary={name}
                    />
                    <ListItemIcon>
                      {isCreated && (
                        <Chip
                          className={classes.Chip}
                          size="small"
                          label="Created"
                          icon={<DoneIcon className={classes.Chip} />}
                        />
                      )}
                    </ListItemIcon>
                    {isCreated && selectedIndex === id && (
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
                    )}
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
          size="large"
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
          onClick={openModal}
        >
          Create One !
        </Button>
        {getDashboardsError && (
          <ErrorToast error={getErrorMessage(getDashboardsError)} />
        )}
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
