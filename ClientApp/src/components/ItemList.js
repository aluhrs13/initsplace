import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
    table: {},
});

export default function ItemList(props) {
    const classes = useStyles();
    //TODO - rows load and empty states
    const [rows, setRows] = useState();

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/Items`;

        if (props.containerId) {
            baseUrl = baseUrl + "/in/" + props.containerId;
        }

        axios.get(baseUrl).then(({ data }) => {
            setRows(data);
        });
    }, [props.containerId, props.refreshCount]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows ? (
                        rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <RouterLink to={"/Item/" + row.id}>
                                            {row.name}
                                        </RouterLink>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow key="0">
                                <TableCell align="center">
                                    <Typography variant="h4" gutterBottom>
                                        No items here, add one below!
                                    </Typography>
                                    <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                    >
                                        No rows returned
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )
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
                </TableBody>
            </Table>
        </TableContainer>
    );
}
