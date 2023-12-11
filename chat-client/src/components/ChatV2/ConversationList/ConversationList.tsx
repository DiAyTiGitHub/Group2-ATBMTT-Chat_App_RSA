import React, { useState, useEffect, memo } from 'react';
import ConversationSearch from './ConversationSearch/ConversationSearch';
import ConversationListItem from './ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';

import './ConversationList.css';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';

function ConversationList() {
  const { chatStore } = useStore();
  const { joinedRooms } = chatStore;
 
  return (
    <div className="conversation-list">
      <Toolbar title="Chat" />
      <ConversationSearch />
      {
        joinedRooms.map(function (room, index) {
          return (
            <ConversationListItem
              key={index}
              room={room}
            />
          );
        })
      }
      {
        !joinedRooms || (joinedRooms.length === 0) && (
          <>
            You don't have any conversation, lets add friends and start chatting!
          </>
        )
      }
    </div>
  );
}

export default memo(observer(ConversationList));
