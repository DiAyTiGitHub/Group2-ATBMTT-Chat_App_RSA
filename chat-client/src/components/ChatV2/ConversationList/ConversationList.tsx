import React, { useState, useEffect, memo } from 'react';
import ConversationSearch from './ConversationSearch/ConversationSearch';
import ConversationListItem from './ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';

import './ConversationList.css';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';

function ConversationList() {
  // const [conversations, setConversations] = useState([]);
  // useEffect(() => {
  //   getConversations()
  // }, [])

  // const getConversations = () => {
  //   var tempData = [
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //     {
  //       photo: 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg',
  //       name: 'test name',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor laoreet quam, dignissim ullamcorper lacus tempor nec. Sed scelerisque augue libero, bibendum finibus neque imperdiet sit amet.'
  //     },
  //   ]
  //   setConversations([...conversations, ...tempData]);
  // };
  const { chatStore } = useStore();
  const { joinedRooms } = chatStore;

  return (
    <div className="conversation-list">
      <Toolbar title="Chat" />
      <ConversationSearch />
      {
        joinedRooms.map(function (room, index) {
          console.log(room, index);
          return (
            <ConversationListItem
              key={index}
              room={room}
            />
          );
        })
      }
      {
        !joinedRooms || (joinedRooms.length === 0) && (
          <>
            You don't have any conversation, lets add friends and start chatting!
          </>
        )
      }
    </div>
  );
}

export default memo(observer(ConversationList));
