import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ItemList from "../components/ItemList";
import ContainerList from "../components/ContainerList";
import AddContainerButton from "../components/AddContainerButton";
import AddItemButton from "../components/AddItemButton";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function BrowseContainer(props) {
    const containerId = props.match.params.id;
    const classes = useStyles();
    const [title, setTitle] = useState("Unknown");
    const [parent, setParent] = useState();

    useEffect(() => {
        var baseUrl =
            `https://localhost:5001/api/Containers/Details/` + containerId;

        axios.get(baseUrl).then(({ data }) => {
            console.log("----------");
            console.log("Container Detail:");
            console.log(data);
            console.log("----------");

            setParent(data.parent);
            setTitle(data.name);
        });
    }, [containerId]);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {parent ? (
                        <RouterLink to={"/Container/" + parent.id}>
                            {parent.name}
                        </RouterLink>
                    ) : (
                        <RouterLink to={"/"}>Home</RouterLink>
                    )}
                    <h1>{title}</h1>
                </Grid>

                <Grid item xs={12}>
                    <h2>Items</h2>
                    <ItemList containerId={containerId} />
                    <AddItemButton />
                </Grid>

                <Grid item xs={12}>
                    <h2>Containers</h2>
                    <ContainerList containerId={containerId} />
                    <AddContainerButton />
                </Grid>
            </Grid>
        </div>
    );
}
