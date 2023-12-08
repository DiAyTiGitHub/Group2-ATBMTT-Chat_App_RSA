import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch/ConversationSearch';
import ConversationListItem from '../ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';

import './ConversationList.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  },[])

  const getConversations = () => {
    var tempData = [
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'test',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
    ]
          setConversations([...conversations, ...tempData]); 
    };
  
    console.log(conversations)

    return (
      <div className="conversation-list">
        <Toolbar title="Chat"/>
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
