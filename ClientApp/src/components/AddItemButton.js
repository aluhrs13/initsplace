import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    //TODO - Right align buttons
    buttonContainer: {},
    button: {
        margin: theme.spacing(1),
        position: "relative",
        right: "0",
    },
}));

export default function AddItemButton() {
    const classes = useStyles();

    return (
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
    );
}
