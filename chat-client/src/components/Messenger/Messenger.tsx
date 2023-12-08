import React from 'react';
import ConversationList from '../ConversationList/ConversationList';
import MessageList from '../MessageList/MessageList';
import InfoList from '../InfoList/InfoList'
import './Messenger.css';

export default function Messenger(props) {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>
        <div className="scrollable content">
          <MessageList />
        </div>
        <div className="scrollable sidebar">
          <InfoList />
        </div>
      </div>
    );
}