import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ItemList from "../components/ItemList";
import ContainerList from "../components/ContainerList";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    //TODO - Right align buttons
    buttonContainer: {},
    button: {
        margin: theme.spacing(1),
        position: "relative",
        right: "0",
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>Everything in its place</h1>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Containers</h2>
                    <ContainerList containerId="" />
                    <div className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                        >
                            New Container
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Items</h2>
                    <ItemList containerId="" />
                    <div className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                        >
                            New Item
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
