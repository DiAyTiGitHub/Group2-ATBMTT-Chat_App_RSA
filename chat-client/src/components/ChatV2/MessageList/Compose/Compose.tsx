import React, { memo, useState } from 'react';
import './Compose.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

function Compose() {
  const { chatStore } = useStore();
  const { sendMessage } = chatStore;
  const [messageContent, setMessageContent] = useState("");

  function handleChangeMessageContent(event: any) {
    const { value } = event.target;
    setMessageContent(value);
  }

  function handleSendMessage() {
    sendMessage(messageContent);
  }

  function handleOnKeyDownMessageContent(event: any) {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === "Enter") {
      // Your code to handle Enter key press goes here
      handleSendMessage();
    }
  }

  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input br-10 p-2 mr-2"
        placeholder="Type a message, @name"
        value={messageContent}
        onChange={handleChangeMessageContent}
        onKeyDown={handleOnKeyDownMessageContent}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        <SendRoundedIcon></SendRoundedIcon>
      </Button>
    </div>
  );
}

export default memo(observer(Compose));