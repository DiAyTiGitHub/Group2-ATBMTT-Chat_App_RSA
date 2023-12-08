import React, { useState, useEffect } from 'react';
import ConversationSearch from '../ConversationSearch/ConversationSearch';
import ConversationListItem from './ConversationListItem/ConversationListItem';
import Toolbar from '../MessageList/Toolbar/Toolbar';

import './ConversationList.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  }, [])

  const getConversations = () => {
    var tempData = [
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
      {
        photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
        name: 'test name',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
      },
    ]
    setConversations([...conversations, ...tempData]);
  };

  return (
    <div className="conversation-list">
      <Toolbar title="Chat" />
      <ConversationSearch />
      {
        conversations.map(function (conversation, index) {
          return (
            <ConversationListItem
              key={index}
              data={conversation}
            />

          );
        })
      }
    </div>
  );
}
