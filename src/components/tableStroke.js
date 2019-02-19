import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const TableStroke = ({ data }) => {
    const { id, firstName, lastName, email, phone } = data;
    return (
        <Paper className="aero-flex">
            <Grid item xs={1}><p className="aero-centred">{id}</p></Grid>
            <Grid item xs={2}><p className="aero-centred">{firstName}</p></Grid>
            <Grid item xs={3}><p className="aero-centred">{lastName}</p></Grid>
            <Grid item xs={3}><p className="aero-centred">{email}</p></Grid>
            <Grid item xs={3}><p className="aero-centred">{phone}</p></Grid>
        </Paper>
    )
};

export default TableStroke;