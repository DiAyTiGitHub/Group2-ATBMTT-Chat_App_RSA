import React, { useState, useEffect, memo } from 'react';
import ConversationSearch from './ConversationSearch/ConversationSearch';
import ConversationListItem from './ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';

import './ConversationList.css';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import ConversationListItemLoadingSkeleton from './ConversationListItem/ConversationListItemLoadingSkeleton';

function ConversationList() {
  const { chatStore } = useStore();
  const {
    joinedRooms,
    isLoading,
  } = chatStore;
  return (
    <div>
      <Toolbar title="Chat">
        <ConversationSearch />
      </Toolbar>
      <div className="conversation-list flex-column">
        <div className="conversationListItemWrapper">
          {
            // if is loading, render skeleton
            isLoading ? (
              <>
                {
                  [1, 2, 3, 4, 5, 6, 7].map(function (_, index) {
                    return (
                      <ConversationListItemLoadingSkeleton key={index} />
                    );
                  })
                }
              </>
            )
              :
              // if is not loading, render data
              (
                <>
                  {
                    joinedRooms.map(function (room, index) {
                      return (
                        <ConversationListItem
                          key={room?.id}
                          room={room}
                        />
                      );
                    })
                  }
                  {
                    ((!joinedRooms || (joinedRooms.length === 0)) && !isLoading) && (
                      <div className="no-conversation">
                        <p>You don't have any conversation, lets add friends and start chatting!</p>
                      </div>
                    )
                  }
                </>
              )
          }
        </div>
      </div>
    </div>

  );
}

export default memo(observer(ConversationList));
