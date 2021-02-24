import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ItemList from "../components/ItemList";
import ContainerList from "../components/ContainerList";
import AddContainerModal from "../components/AddContainerModal";
import AddItemModal from "../components/AddItemModal";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function BrowseContainer(props) {
    const containerId = props.match.params.id;
    const classes = useStyles();
    const [refreshCount, incrementRefresh] = useState(0);
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

    function refreshTables() {
        incrementRefresh(refreshCount + 1);
    }

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
                    <Typography variant="h4" gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom>
                        Containers
                    </Typography>
                    <ContainerList
                        containerId={containerId}
                        refreshCount={refreshCount}
                    />
                    <AddContainerModal
                        containerId={containerId}
                        refreshParent={refreshTables}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5" gutterBottom>
                        Items
                    </Typography>
                    <ItemList
                        containerId={containerId}
                        refreshCount={refreshCount}
                    />
                    <AddItemModal
                        containerId={containerId}
                        refreshParent={refreshTables}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
