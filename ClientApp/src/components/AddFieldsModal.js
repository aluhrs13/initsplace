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
    const [open, setOpen] = useState(false);
    const [name, setName] = useState([]);
    const [fieldList, setFieldList] = useState("");

    const addMoreItem = (fieldId, newValue) => {
        var newarr = name;
        newarr[fieldId] = newValue;
        setName(newarr);
    };

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/ItemFields/`;

        axios.get(baseUrl).then(({ data }) => {
            console.log("----------");
            console.log("FieldList:");
            console.log(data);
            console.log("----------");

            setFieldList(data);
        });
    }, []);

    const handleSubmit = (e) => {
        //TODO - Iterate through name and submit the form for each of them. Index value is the fieldId
        var baseUrl =
            `https://localhost:5001/api/ItemFields?itemId=` + props.itemId;

        name.map((fieldChanged, index) =>
            axios
                .post(baseUrl + "&fieldId=" + index + "&value=" + fieldChanged)
                .then(({ data }) => {})
        );

        props.action();
        handleClose();
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
            <h2 id="simple-modal-title">Add Fields</h2>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                {fieldList.length > 0 && props.usedFields ? (
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
