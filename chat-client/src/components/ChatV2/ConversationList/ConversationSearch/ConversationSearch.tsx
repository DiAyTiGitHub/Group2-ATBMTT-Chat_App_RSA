import React, { memo, useState } from 'react';
import './ConversationSearch.css';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';
import { IconButton, Modal, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Checkbox, Avatar, Typography, Divider, TextField, Button } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

function ConversationSearch() {
  const { chatStore, friendsStore } = useStore();
  const { searchConversation } = chatStore;
  const { usersList } = friendsStore;
  const [open, setOpen] = React.useState(false);
  const handleOpenPopup = () => setOpen(true);
  const handleClosePopup = () => setOpen(false);
  
  const [searchKeyword, setSearchKeyword] = useState();

  function handleChange(event: any) {
    const { value } = event.target;
    setSearchKeyword(value);
    handleSearch(value);
  }

  function handleSearch(keyword: string) {
    searchConversation(keyword);
  }

  function handleOnKeyDown(event: any) {
    if (event.key === "Enter") {
      handleSearch(searchKeyword);
    }
  }

  const [checked, setChecked] = React.useState([1]);

  const handleToggleCheckBox = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function renderAvatar(avatar) {
    if (!avatar || avatar.trim() === '') {
      return 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
    }
    return avatar;
  }

  return (
    <div className="conversation-search w-100">
      <input
        type="text"
        className="conversation-search-input"
        placeholder="Search Messages"
        value={searchKeyword}
        onChange={handleChange}
        onKeyDown={handleOnKeyDown}
      />
      <IconButton aria-label="new group chat" onClick={handleOpenPopup}>
        <GroupAddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClosePopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal-container'>
          <Typography variant='h5' sx={{ fontWeight: 800}}>NEW GROUP CHAT</Typography>
          <TextField id="standard-basic" label="Enter chat name" variant="standard" />
          <List dense sx={{ width: '100%' }}>
            {usersList.map((user, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggleCheckBox(index)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt=''
                        src={ renderAvatar(user.avatar) }
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={user.username} color='black'/>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div className='d-flex justify-content-around'>
            <Button variant="contained">Cancel</Button>
            <Button variant="contained">Confirm</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}


export default memo(observer(ConversationSearch));