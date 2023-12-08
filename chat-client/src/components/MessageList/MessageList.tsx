import React, {useEffect, useState} from 'react';
import Compose from '../Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import Message from '../Message/Message';

import './MessageList.css';

const MY_USER_ID = 'Lorem';

export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages();
  },[])

    const getMessages = () => {
    var tempMessages = [
        {
          id: 1,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam,',
        },
        {
          id: 3,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed',
        },
        {
          id: 4,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam,',
        },
        {
          id: 5,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.',
        },
        {
          id: 6,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          id: 7,
          author: 'Ipsum',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        },
        {
          id: 8,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam,',
        },
        {
          id: 9,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.',
        },
        {
          id: 10,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          id: 11,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 12,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam,',
        },
        {
          id: 13,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed',
        },
        {
          id: 14,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam,',
        },
        {
          id: 15,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.',
        },
        {
          id: 16,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          id: 17,
          author: 'Ipsum',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        },
        {
          id: 18,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam,',
        },
        {
          id: 19,
          author: 'Lorem',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.',
        },
        {
          id: 20,
          author: 'Ipsum',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        }
      ]
      setMessages([...messages, ...tempMessages])
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let startsSequence = true;
      let endsSequence = false;
      let photo = "test";
      if(previous && previous.author === current.author) {
        startsSequence = false
      }

      if(next && next.author !== current.author) {
        endsSequence = true
      }
      
      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          data={current}
          author = {current.author}
          photo
        />
      );
      i += 1;
    }
        return tempMessages;
  }

    return(
      <div className="message-list">
        <Toolbar title="Conversation Title" />
          <div className="message-list-container">{renderMessages()}</div>
        <Compose></Compose>
      </div>
      
    );
}