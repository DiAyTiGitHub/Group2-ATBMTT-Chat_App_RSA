import React from 'react';
import './Compose.css';
import Button from "@material-ui/core/Button";



export default function Compose() {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />
        <Button variant="contained">
          SEND
        </Button>
      </div>
    );
}