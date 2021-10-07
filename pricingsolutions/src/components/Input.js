import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, type, datatestid, label, value, variant, onChange} = props;
    return (
        <TextField
            variant={variant || "outlined"}
            label={label}
            type = {type}
            name={name}
            data-testid = {datatestid}
            value={value}
            onChange={onChange}

        />
    )
}