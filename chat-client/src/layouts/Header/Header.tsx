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
import Tooltip from '@mui/material/Tooltip';

function Header() {
    const currentPage = window.location.pathname;
    console.log(currentPage);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="flex-center justify-right w-100 header p-4">
                    <NavLink key={0} to={'/chat-v2'} className="p-0 px-4">
                        <Tooltip title="Messaging" enterDelay={500} leaveDelay={200} arrow followCursor>
                            <QuestionAnswerRoundedIcon className='icons'></QuestionAnswerRoundedIcon>
                        </Tooltip>
                    </NavLink>
                    <NavLink key={1} to={'/chat'} className="p-0 px-4">
                        <Tooltip title="?" enterDelay={500} leaveDelay={200} arrow followCursor>
                            <QuestionMarkRoundedIcon className='icons'></QuestionMarkRoundedIcon>
                        </Tooltip>
                    </NavLink>
                    <NavLink key={2} to={'/friends'} className="p-0 px-4">
                        <Tooltip title="Friends" enterDelay={500} leaveDelay={200} arrow followCursor>
                            <PeopleRoundedIcon className='icons'></PeopleRoundedIcon>
                        </Tooltip>
                    </NavLink>
                    <NavLink key={3} to={'account'} className="p-0 px-4">
                        <Tooltip title="Account" enterDelay={500} leaveDelay={200} arrow followCursor>
                            <AccountCircleRoundedIcon className='icons'></AccountCircleRoundedIcon>
                        </Tooltip>
                    </NavLink>
                    <NavLink key={4} to={'/'} className="p-0 px-4">
                        <Tooltip title="Switch account" enterDelay={500} leaveDelay={200} arrow followCursor>
                            <ExitToAppRoundedIcon className='icons'></ExitToAppRoundedIcon>
                        </Tooltip>
                    </NavLink>
                </div>
            </Grid>
        </Grid>
    );
}

export default memo(Header);