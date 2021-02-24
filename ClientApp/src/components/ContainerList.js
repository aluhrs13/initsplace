import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
    table: {},
});

export default function ContainerList(props) {
    const classes = useStyles();
    //TODO - rows loading and empty states
    const [rows, setRows] = useState();

    useEffect(() => {
        var baseUrl = `https://localhost:5001/api/Containers`;

        if (props.containerId) {
            baseUrl = baseUrl + "/" + props.containerId;
        }

        axios.get(baseUrl).then(({ data }) => {
            setRows(data);
        });
    }, [props.containerId, props.refreshCount]);

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    return (
        <div className={classes.root}>
            <List component="nav">
                {rows ? (
                    rows.length > 0 ? (
                        rows.map((row) => (
                            <RouterLink to={"/Container/" + row.id}>
                                <ListItemLink href={"/Container/" + row.id}>
                                    <ListItemText>{row.name}</ListItemText>
                                </ListItemLink>
                            </RouterLink>
                        ))
                    ) : (
                        <div align="center">
                            <Typography variant="h6" gutterBottom>
                                No containers here, add one below!
                            </Typography>
                            <Typography
                                variant="overline"
                                display="block"
                                gutterBottom
                            >
                                No rows returned{" "}
                            </Typography>
                        </div>
                    )
                ) : (
                    <div align="center">
                        <Typography variant="h6" gutterBottom>
                            No containers here, add one below!
                        </Typography>
                        <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                        >
                            Rows is null
                        </Typography>
                    </div>
                )}
            </List>
        </div>
    );
}

/*
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
*/
