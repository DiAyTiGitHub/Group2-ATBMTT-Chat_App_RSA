import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import ConversationList from './ConversationList/ConversationList';
import MessageList from './MessageList/MessageList';
import InfoList from './InfoList/InfoList';
import './ChatV2Index.css';

function ChatIndex() {
    const { chatStore, authStore } = useStore();

    const { authenticatedUser } = authStore;
    
    const {
        registerUser,
        getAllJoinedRooms,
        chosenRoom
    } = chatStore;

    const navigate = useNavigate();
    useEffect(function () {
        if (!authenticatedUser) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            registerUser();
            getAllJoinedRooms();
        }
    }, []);

    return (
        <div className="app">
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ConversationList />
                </div>
                <div className="scrollable content">
                    <MessageList />
                </div>
                <div className="scrollable sidebar">
                    <InfoList />
                </div>
            </div>
        </div>
    )
}

export default memo(observer(ChatIndex));