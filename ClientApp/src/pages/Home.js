import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ItemList from "../components/ItemList";
import ContainerList from "../components/ContainerList";
import AddContainerModal from "../components/AddContainerModal";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Home() {
    const classes = useStyles();
    const [refreshCount, incrementRefresh] = useState(0);

    function handler() {
        incrementRefresh(refreshCount + 1);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>Everything in its place</h1>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Places</h2>
                    <ContainerList containerId="" refreshCount={refreshCount} />
                    <AddContainerModal containerId="" action={handler} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h2>Recently Added Things</h2>
                    <ItemList containerId="" />
                </Grid>
            </Grid>
        </div>
    );
}
