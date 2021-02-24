import React, { useState, useEffect } from "react";
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
        width: "100%",
    },
}));

export default function AddFieldsModal(props) {
    const classes = useStyles();
    //Controls the modal open/close state
    const [open, setOpen] = useState(false);
    //An array of the values of each unused field
    const [fieldValues, setFieldValues] = useState([]);
    //List of possible fields
    const [fieldList, setFieldList] = useState("");

    const addMoreItem = (fieldId, newValue) => {
        var newarr = fieldValues;
        newarr[fieldId] = newValue;
        setFieldValues(newarr);
    };

    //On load, get the list of possible fields.
    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/ItemFields/`;

        axios.get(baseUrl).then(({ data }) => {
            setFieldList(data);
        });
    }, []);

    const handleSubmit = (e) => {
        var baseUrl =
            `https://localhost:5001/api/ItemFields?itemId=` + props.itemId;

        //Iterate through each changed field and POST the creation
        fieldValues.map((fieldChanged, index) =>
            axios
                .post(baseUrl + "&fieldId=" + index + "&value=" + fieldChanged)
                .then(({ data }) => {})
        );

        //Refresh parent, close modal, prevent refresh
        props.action();
        handleClose();
        e.preventDefault();
    };

    //Open/close modals
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Add Fields</h2>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                {fieldList.length > 0 && props.usedFields ? (
                    //If there's fields available make TextFields for all the unused ones
                    fieldList.map((row) =>
                        props.usedFields.some(
                            (item) => item.fieldId === row.id
                        ) ? (
                            <></>
                        ) : (
                            <TextField
                                key={row.id}
                                label={row.name}
                                name={row.id}
                                type="text"
                                onChange={(e) =>
                                    addMoreItem(row.id, e.target.value)
                                }
                                className={classes.textfield}
                            />
                        )
                    )
                ) : (
                    <div>No items here, add one below!</div>
                )}

                <br />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    Add Fields
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
                Add More Fields
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
