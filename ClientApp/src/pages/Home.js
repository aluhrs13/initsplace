import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ItemList from "../components/ItemList";
import ContainerList from "../components/ContainerList";
import AddContainerButton from "../components/AddContainerButton";
import AddItemButton from "../components/AddItemButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
                    <AddContainerButton />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Items</h2>
                    <ItemList containerId="" />
                    <AddItemButton />
                </Grid>
            </Grid>
        </div>
    );
}
