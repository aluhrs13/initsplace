import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonContainer: {},
    button: {
        margin: theme.spacing(1),
        position: "relative",
        right: "0",
    },
    textfield: {
        margin: theme.spacing(1),
    },
}));

export default function AddItemModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState();

    const handleSubmit = (e) => {
        var baseUrl = `https://localhost:5001/api/Items/?name=` + name;
        baseUrl = baseUrl + `&parentId=` + props.containerId;

        axios.post(baseUrl).then(({ data }) => {
            setName();
            handleClose();
            props.action();
        });

        e.preventDefault();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Add New Item</h2>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <TextField
                    label="Name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classes.textfield}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    Create Item
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                New Item
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                {body}
            </Modal>
        </div>
    );
}
