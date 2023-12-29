import React, { memo, useEffect, useState } from 'react';
import navigations from 'src/navigation';
import { NavLink, useNavigate } from 'react-router-dom';
import './HeaderStyles.scss';
import { AppBar, Toolbar, Box, Menu, MenuItem, IconButton, Avatar, Button, Typography, Tooltip } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LocalStorage from 'src/common/LocalStorage';
import { observer } from 'mobx-react';
import HeaderAvatarMenu from './HeaderAvatarMenu';
import { useStore } from 'src/stores';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Account', 'Friends', , 'Logout'];

function Header() {
  const navigate = useNavigate();

  const { authStore, accountStore } = useStore();
  const { currentLoginUser } = authStore;
  const { getAvatarSrc } = accountStore;

  const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');
  useEffect(function () {
    if (currentLoginUser && currentLoginUser.avatar && currentLoginUser.avatar != "") {
      const imageSrcPromise = getAvatarSrc(currentLoginUser.avatar);
      imageSrcPromise.then(function (data) {
        setImagePath(data);
      })
    }
  }, [currentLoginUser?.avatar]);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  function handleCloseUserMenu() {
    setOpenUserMenu(false);
  }

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AppBar position="static" className="appHeader">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <NavLink to={'./chat'} className="p-0 px-4 d-flex">
            <Button
              onClick={function () { navigate("/chat"); }}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '20px' }}
            >
              <Tooltip title='Show conversations and messages' enterDelay={500} leaveDelay={200} arrow>
                <QuestionAnswerRoundedIcon fontSize="large"></QuestionAnswerRoundedIcon>
              </Tooltip>
            </Button>
          </NavLink>
          <NavLink to={'./friends'} className="p-0 px-4 d-flex">
            <Button
              onClick={function () { navigate("/friends"); }}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: '20px' }}
            >
              <Tooltip title='Show people and friends' enterDelay={500} leaveDelay={200} arrow>
                <PeopleRoundedIcon fontSize="large"></PeopleRoundedIcon>
              </Tooltip>
            </Button>
          </NavLink>
        </Box>

        <Box sx={{ flexGrow: 0, mr: '20px' }}>
          <Tooltip title="Account and other options">
            <IconButton ref={anchorRef} onClick={function () { setOpenUserMenu(true) }} sx={{ p: 0 }}>
              <Avatar alt="" src={imagePath} />
            </IconButton>
          </Tooltip>

          {openUserMenu && (
            <HeaderAvatarMenu
              open={openUserMenu}
              handleClose={handleCloseUserMenu}
              anchorRef={anchorRef}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default memo(observer(Header));