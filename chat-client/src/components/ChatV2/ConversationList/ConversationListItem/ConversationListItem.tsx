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
  console.log("id: " + id); 
  console.log("avatar: " + avatar); 
  console.log("name: " + name); 
  console.log("code: " + code);
  console.log("participants: " + participants);
  console.log("messages: " + messages);
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

  console.log("chosenRoom.participants.length: " + chosenRoom?.participants.length);
  function renderAvatar() {
    if (participants.length === 2) {
      const currentUser = LocalStorage.getLoginUser();
      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        if (participant.id !== currentUser.id) {
          console.log("Avt người dùng khác: "+participant.avatar);
          return participant.avatar;
        }
      }
    }else if (!chosenRoom || !chosenRoom?.avatar || chosenRoom?.avatar.trim() === '') {
      return "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg";
    }
    // Nếu không phải cuộc trò chuyện cá nhân, sử dụng avatar của phòng chat
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