import React from 'react';
import './Message.css';

export default function Message(props) {
    const {
      data,
      author,
      type,
      isMine,
      startsSequence,
      endsSequence,
      photo
    } = props;
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          type=="notification" &&
            <div className="notification">
              test
            </div>
        }
        {/* {
          !isMine && startsSequence && 
          <img className="conversation-photo" src={photo} alt="" />
        } */}
        {
          startsSequence &&
            <div className="username">
              { author }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble">
            { data }
          </div>
        </div>
      </div>
    );
}