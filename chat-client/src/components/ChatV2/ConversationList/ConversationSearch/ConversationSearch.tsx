import React, { memo, useState } from 'react';
import './ConversationSearch.css';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';
import { IconButton } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupConversationCreator from './GroupConversationCreator/GroupConversationCreator';

function ConversationSearch() {
  const { chatStore } = useStore();
  const { searchJoinedRooms } = chatStore;

  const [searchKeyword, setSearchKeyword] = useState();

  function handleChange(event: any) {
    const { value } = event.target;
    setSearchKeyword(value);
    handleSearch(value);
  }

  function handleSearch(keyword: string) {
    searchJoinedRooms(keyword);
  }

  function handleOnKeyDown(event: any) {
    if (event.key === "Enter") {
      handleSearch(searchKeyword);
    }
  }

  const [openChooseMember, setOpenChooseMember] = useState(false);

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
      <IconButton aria-label="new group chat" onClick={function () {
        setOpenChooseMember(true);
      }}>
        <GroupAddIcon />
      </IconButton>

      <GroupConversationCreator
        open={openChooseMember}
        handleClose={function () {
          setOpenChooseMember(false);
        }}
      />

    </div>
  );
}


export default memo(observer(ConversationSearch));