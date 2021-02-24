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
import Typography from "@material-ui/core/Typography";

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
                                <TableRow key="0">
                                    <TableCell align="center">
                                        <Typography variant="h4" gutterBottom>
                                            No fields here, add one below!
                                        </Typography>
                                        <Typography
                                            variant="overline"
                                            display="block"
                                            gutterBottom
                                        >
                                            No rows returned{" "}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    ) : (
                        <TableRow key="0">
                            <TableCell>
                                <Typography variant="h4" gutterBottom>
                                    No items here, add one below!
                                </Typography>
                                <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                >
                                    Rows is null
                                </Typography>
                            </TableCell>
                        </TableRow>
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
