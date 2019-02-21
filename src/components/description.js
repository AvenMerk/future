import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Description = ({ data }) => {
    const { firstName, lastName, address, description} = data;
    return (
        <div>
            <Grid item xs={1}/>
            <Paper className="aero-flex">
                <h3>Выбран пользователь: <b>{firstName} {lastName}</b></h3>
                <p>Описание:</p>
                <textarea placeholder={description} />
                <p>Адрес проживания: <b>{address.streetAddress}</b></p>
                <p>Город: <b>{address.city}</b></p>
                <p>Провинция/штат: <b>{address.state}</b></p>
                <p>Индекс: <b>{address.zip}</b></p>
            </Paper>
        </div>
    );
};

export default Description;