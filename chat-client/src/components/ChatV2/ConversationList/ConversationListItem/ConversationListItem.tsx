import React, { useEffect, memo } from 'react';
import './ConversationListItem.css';
import LocalStorage from 'src/common/LocalStorage';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import { format, parseISO } from 'date-fns';
import RSAService from 'src/components/Auth/RSAService';

function ConversationListItem(props: any) {
  const { authStore, chatStore } = useStore();
  const { setChosenRoom, chosenRoom } = chatStore;

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

  const { privateKey } = authStore;
  const { rsaDecrypt } = chatStore;

  function renderLastMessageInConversation() {
    if (messages && messages.length > 0) {

      const lastMessage = messages[messages.length - 1];
      return rsaDecrypt(lastMessage.content, lastMessage.messageType.name, privateKey);
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
    <div className={`conversation-list-item ${chosenRoom?.id === id && " conversation-list-item--chosen"}`} onClick={handleChooseConversation}>
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