import React, { memo } from 'react';
import navigations from 'src/navigation';
import { NavLink } from 'react-router-dom';
import './HeaderStyles.scss';
import { AppBar, Toolbar, Box, Menu, MenuItem, IconButton, Avatar, Button, Typography, Tooltip } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LocalStorage from 'src/common/LocalStorage';
import { observer } from 'mobx-react';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Account', 'Friends', , 'Logout'];

function Header() {

  const currentPage = window.location.pathname;
  const avatar = LocalStorage.getLoginUser()?.avatar ? LocalStorage.getLoginUser()?.avatar : 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <AppBar position="static" className="appHeader">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <NavLink to={'./chat-v2'} className="p-0 px-4 d-flex">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '20px' }}
            >
              <Tooltip title='Show conversations and messages' enterDelay={500} leaveDelay={200} arrow>
                <QuestionAnswerRoundedIcon fontSize="large"></QuestionAnswerRoundedIcon>
              </Tooltip>
            </Button>
          </NavLink>
          <NavLink to={'./friends'} className="p-0 px-4 d-flex">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '20px' }}
            >
              <Tooltip title='Show people and friends' enterDelay={500} leaveDelay={200} arrow>
                <PeopleRoundedIcon fontSize="large"></PeopleRoundedIcon>
              </Tooltip>
            </Button>
          </NavLink>
        </Box>

        <Box sx={{ flexGrow: 0, mr: '20px' }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="" src={avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <NavLink to={'account'} className="p-0 px-4 d-flex" style={{ textDecoration: "none", color: "black" }}>
                <Typography textAlign="center" fontWeight='500'>ACCOUNT</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <NavLink to={'/'} className="p-0 px-4 d-flex" style={{ textDecoration: "none", color: "black" }}>
                <Typography textAlign="center" fontWeight='500'>LOGOUT</Typography>
              </NavLink>
            </MenuItem>

          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default memo(observer(Header));