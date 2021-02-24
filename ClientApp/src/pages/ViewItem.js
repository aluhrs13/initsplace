import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FieldList from "../components/FieldList";

import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function BrowseContainer(props) {
    const itemId = props.match.params.id;
    const classes = useStyles();
    const [title, setTitle] = useState("Unknown");
    const [parent, setParent] = useState();

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/Items/` + itemId;

        axios.get(baseUrl).then(({ data }) => {
            setParent(data.parent);
            setTitle(data.name);
        });
    }, [itemId]);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {parent ? (
                        <RouterLink to={"/Container/" + parent.id}>
                            ^ {parent.name}
                        </RouterLink>
                    ) : (
                        <RouterLink to={"/"}>^ Home</RouterLink>
                    )}
                    <h1>{title}</h1>
                </Grid>

                <Grid item xs={12}>
                    <h2>Fields</h2>
                    <FieldList itemId={itemId} />
                </Grid>
            </Grid>
        </div>
    );
}
