import React from 'react';
import './Compose.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function Compose() {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />
        <Button variant="contained">
          <SendRoundedIcon></SendRoundedIcon>
        </Button>
      </div>
    );
}