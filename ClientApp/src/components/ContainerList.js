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

const useStyles = makeStyles({
    table: {},
});

export default function ContainerList(props) {
    const classes = useStyles();
    const [rows, setRows] = useState();

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/Containers`;

        if (props.containerId) {
            baseUrl = baseUrl + props.containerId;
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                component="a"
                                href={"container/" + row.id}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <div>No Containers Found</div>
                )}
            </Table>
        </TableContainer>
    );
}
