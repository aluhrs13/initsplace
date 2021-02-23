import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
    table: {},
});

export default function ContainerList(props) {
    const classes = useStyles();
    //TODO - rows load and empty states
    const [rows, setRows] = useState();

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/Containers`;

        if (props.containerId) {
            console.log("Containers got an id of " + props.containerId);
            baseUrl = baseUrl + "/" + props.containerId;
        }

        axios.get(baseUrl).then(({ data }) => {
            console.log("----------");
            console.log("Container List:");
            console.log(data);
            console.log("----------");

            setRows(data);
        });
    }, [props.containerId]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Container</TableCell>
                    </TableRow>
                </TableHead>
                {rows ? (
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        <RouterLink to={"/Container/" + row.id}>
                                            {row.name}
                                        </RouterLink>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <div>No containers here, add one below!</div>
                        )}
                    </TableBody>
                ) : (
                    <div>No Containers Found</div>
                )}
            </Table>
        </TableContainer>
    );
}
