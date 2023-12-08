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
    const navigate = useNavigate();
    useEffect(function () {
        if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
    }, []);

    const { authStore, chatStore } = useStore();
    const {
        // currentUser
    } = authStore;

    const userData = {
        connected: true,
        username: "diayti",
    };

    // const {
    //     setTab,
    //     sendPrivateValue,
    //     sendValue,
    //     tab,
    //     privateMessage,
    //     publicMessage,
    //     setPrivateMessage,
    //     setPublicMessage
    // } = chatStore;

    // function handleChangePrivateMessage(event: any) {
    //     const { value } = event.target;
    //     setPrivateMessage(value);
    // }

    // function handleChangePublicMessage(event: any) {
    //     const { value } = event.target;
    //     setPublicMessage(value);
    // }

    // function handleSendPublicMessage() {
    //     sendValue(authStore);
    // }

    // function handleSendPrivateMessage() {
    //     sendPrivateValue(authStore);
    // }

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