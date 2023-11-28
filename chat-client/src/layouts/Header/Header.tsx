import React, { memo } from 'react';
import navigations from 'src/navigation';
import { NavLink } from 'react-router-dom';
import './HeaderStyles.scss';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'

function Header() {
    const currentPage = window.location.pathname;
    console.log(currentPage);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="flex-center justify-right w-100 header p-4">
                    {navigations.map(function (navigation, index) {
                        return (
                            <NavLink key={index} to={navigation.path} className="p-0 px-4">
                                <p>{navigation.name}</p>
                            </NavLink>
                        );
                    })}
                </div>
            </Grid>
        </Grid>
    );
}

export default memo(Header);