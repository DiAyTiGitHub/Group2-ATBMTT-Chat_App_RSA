import React, { memo } from 'react';
import navigations from 'src/navigation';
import { NavLink } from 'react-router-dom';
import './HeaderStyles.scss';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

function Header() {
    const currentPage = window.location.pathname;
    console.log(currentPage);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="flex-center justify-right w-100 header p-4">
                    {/* {navigations.map(function (navigation, index) {
                        return (
                            <NavLink key={index} to={navigation.path} className="p-0 px-4">
                                <p>{navigation.name}</p>
                            </NavLink>
                        );
                    })} */}
                    <NavLink key={0} to={'/chat-v2'} className="p-0 px-4">
                        <QuestionAnswerRoundedIcon className='icons'></QuestionAnswerRoundedIcon>
                    </NavLink>
                    <NavLink key={1} to={'/chat'} className="p-0 px-4">
                        <QuestionMarkRoundedIcon className='icons'></QuestionMarkRoundedIcon>
                    </NavLink>
                    <NavLink key={2} to={'/friends'} className="p-0 px-4">
                        <PeopleRoundedIcon className='icons'></PeopleRoundedIcon>
                    </NavLink>
                    <NavLink key={3} to={'account'} className="p-0 px-4">
                        <AccountCircleRoundedIcon className='icons'></AccountCircleRoundedIcon>
                    </NavLink>
                    <NavLink key={4} to={'/'} className="p-0 px-4">
                        <ExitToAppRoundedIcon className='icons'></ExitToAppRoundedIcon>
                    </NavLink>
                </div>
            </Grid>
        </Grid>
    );
}

export default memo(Header);