import React from 'react';
import './Message.css';
import moment from 'moment';

export default function Message(props) {
    const {
      data,
      author,
      type,
      isMine,
      startsSequence,
      endsSequence,
      photo,
      sendDate
    } = props;
    console.log(photo);
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
              { moment(sendDate).format('LLLL') } 
            </div>
        }
        {
          startsSequence && 
            <div className="username">
              { author }
            </div>
        }
        <div className="user-container">
        {
        startsSequence && !isMine &&
          <img className="thumbnail" src={ photo } alt=""></img>
        }
        <div className="bubble-container">
          <div className="bubble">
            { data }
          </div>
        </div>
        </div>
      </div>
    );
}