import React, { useEffect, useState, memo, useRef } from 'react';
import Compose from './Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import Message from './Message/Message';
import LocalStorage from 'src/common/LocalStorage';
import './MessageList.css';
import { object } from 'yup';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';
import { ConstructionOutlined } from '@mui/icons-material';



function MessageList(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { chatStore } = useStore();
  const { chosenRoom } = chatStore;
  const MY_USER_ID = LocalStorage.getLoginUser()?.username;

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      console.log(ref.current.scrollHeight)
    }
  };

  const renderMessages = () => {
    const messages = chosenRoom?.messages|| [];
    let i = 0;
    let messageCount = messages.length;
    let tempArray = [];
    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let type = current.messageType.name;
      let isMine = current.user.username === MY_USER_ID;
      let startsSequence = true;
      let endsSequence = false;
      let photo = !isMine && current.user.avatar != null ? current.user.avatar : 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
      let sendDate = current.sendDate;
      if (previous && previous.user.username === current.user.username) {
        startsSequence = false
      }

      if (next && next.user.username !== current.user.username) {
        endsSequence = true
      }

      tempArray.push(
        <Message
          key={i}
          isMine={isMine}
          type={type}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          data={current.content}
          author={current.user.username}
          photo={photo}
          sendDate={sendDate}
        />
      );
      i += 1;
    }
    return tempArray;
  }
  scrollToBottom();

  return (
    <div className="message-list">
      <Toolbar title="Conversation Title" />
      {!chosenRoom ? <div className="no-message"> No conversation was chosen</div>
        : <div className="message-list-container" ref={ref}>
          {
            renderMessages()
          }
        </div>
      }
      <Compose></Compose>
    </div>
  );
}

export default memo(observer(MessageList));