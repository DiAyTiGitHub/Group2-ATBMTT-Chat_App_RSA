import React, { useEffect, memo, useState } from 'react';
import './ConversationListItem.css';
import LocalStorage from 'src/common/LocalStorage';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import { format, parseISO } from 'date-fns';
import RSAService from 'src/components/Auth/RSAService';

function ConversationListItem(props: any) {
  const { authStore, chatStore, accountStore } = useStore();
  const { setChosenRoom, chosenRoom } = chatStore;
  const { getAvatarSrc } = accountStore;
  const currentUser = LocalStorage.getLoginUser();

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

  const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');

  function renderAvatar() {
    if (participants && participants.length > 0 && participants.length === 2) {
      let chattingPerson = null;

      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        if (participant.id !== currentUser.id) {
          chattingPerson = participant;
          break;
        }
      }

      if (chattingPerson && chattingPerson.avatar && chattingPerson.avatar != "") {
        const imageSrcPromise = getAvatarSrc(chattingPerson.avatar);
        imageSrcPromise.then(function (data) {
          setImagePath(data);
        })
      }
    }

    if (participants && participants.length > 0 && participants.length >= 3) {
      if (chosenRoom?.avatar && chosenRoom.avatar.length > 0) {
        const imageSrcPromise = getAvatarSrc(chosenRoom.avatar);
        imageSrcPromise.then(function (data) {
          setImagePath(data);
        })
      }
      else {
        console.log("catched")
        setImagePath("https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png");
      }
    }
  }

  useEffect(renderAvatar, []);

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
      <img className="conversation-photo" src={imagePath} alt="" />
      <div className="conversation-info flex-1">
        <h1 className="conversation-title">{renderConversationName()}</h1>
        <p className="conversation-snippet">{renderLastMessageInConversation()}</p>
      </div>
      <div className="conversation-timestamp"> {renderSentDate()} </div>
    </div>
  );
}

export default memo(observer(ConversationListItem));