import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import AddFieldsModal from "../components/AddFieldsModal";

const useStyles = makeStyles({
    table: {},
});

export default function FieldList(props) {
    const classes = useStyles();
    //TODO - rows load and empty states
    const [rows, setRows] = useState();
    const [refreshCount, incrementRefresh] = useState(0);

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/ItemFields/` + props.itemId;

        axios.get(baseUrl).then(({ data }) => {
            console.log("----------");
            console.log("Field List:");
            console.log(data);
            console.log("----------");

            setRows(data);
        });
    }, [props.itemId, refreshCount]);

    function handler() {
        incrementRefresh(refreshCount + 1);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    {rows ? (
                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.value}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <div>No items here, add one below!</div>
                            )}
                        </TableBody>
                    ) : (
                        <></>
                    )}
                </Table>
            </TableContainer>
            <AddFieldsModal
                action={handler}
                itemId={props.itemId}
                usedFields={rows}
            />
        </>
    );
}
