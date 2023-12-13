import React, { useEffect, memo } from 'react';
import './ConversationListItem.css';
import LocalStorage from 'src/common/LocalStorage';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import { format, parseISO} from 'date-fns';

function ConversationListItem(props: any) {
  const { chatStore } = useStore();
  const { setChosenRoom } = chatStore;

  const { id, avatar, name, code, participants, messages } = props.room;
  function renderConversationName() {
    if (!name || name.trim() === '') {
      const currentUser = LocalStorage.getLoginUser();
      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        if (participant.id !== currentUser.id) {
          return participant.username;
        }
      }
      return "No name conversation";
    }
    return name;
  }

  function renderLastMessageInConversation() {
    if (messages && messages.length > 0) {

      const lastMessage = messages[messages.length - 1];
      return lastMessage.content;
    }
    return "";
  }

  function renderAvatar() {
    if (!avatar || avatar.trim() === '') {
      return 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
    }
    return avatar;
  }

  function renderSentDate() {
    if (messages && messages.length > 0) {

      const lastMessage = messages[messages.length - 1];

      return format(parseISO(lastMessage.sendDate), 'd/M/yyyy');
    }
    return "";
  }

  function handleChooseConversation() {
    setChosenRoom(props.room);
  }

  return (
    <div className="conversation-list-item" onClick={handleChooseConversation}>
      <img className="conversation-photo" src={renderAvatar()} alt="" />
      <div className="conversation-info">
        <h1 className="conversation-title">{renderConversationName()}</h1>
        <p className="conversation-snippet">{renderLastMessageInConversation()}</p>
      </div>
      <div className="conversation-timestamp"> {renderSentDate()} </div>
    </div>
  );
}

export default memo(observer(ConversationListItem));