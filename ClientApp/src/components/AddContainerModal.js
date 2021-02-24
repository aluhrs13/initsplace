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
        width: "100%",
        margin: theme.spacing(1),
        position: "relative",
        right: "0",
    },
    textfield: {
        margin: theme.spacing(1),
    },
}));

export default function AddContainerModal(props) {
    const classes = useStyles();
    //Controls modal open or closed
    const [open, setOpen] = useState(false);
    //Keeps the state of the name form field
    const [name, setName] = useState();

    //POST the container creation
    const handleSubmit = (e) => {
        var baseUrl = `https://localhost:5001/api/Containers/?&name=` + name;

        //If we're in the page for a container, make this container under it.
        if (props.containerId) {
            baseUrl = baseUrl + `&parentId=` + props.containerId;
        }

        axios.post(baseUrl).then(({ data }) => {
            //Once complete, reset the Name field, close modal, and
            setName();
            handleClose();
            props.refreshParent();
        });

        //Prevent page navigation
        e.preventDefault();
    };

    //Open and close events for the modal
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Modal body
    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Add New Container</h2>
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
                    Create Container
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                New Container
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
