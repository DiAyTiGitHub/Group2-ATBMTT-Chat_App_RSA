import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import ConversationList from './ConversationList/ConversationList';
import MessageList from './MessageList/MessageList';
import InfoList from './InfoList/InfoList';
import Box from '@mui/material';
import './ChatV2Index.css';

function ChatIndex() {
    const { chatStore, authStore } = useStore();

    const { currentLoginUser } = authStore;

    const {
        registerUser,
        getAllJoinedRooms,
        setIsLoading
    } = chatStore;

    const navigate = useNavigate();
    useEffect(function () {
        if (!currentLoginUser) {
            // if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            setIsLoading(true);
            registerUser();
            getAllJoinedRooms()
                .finally(function () {
                    setIsLoading(false);
                })
        }
    }, []);

    return (
        <div
            className="app flex-center w-100 p-0 m-0 flex-1"
        >
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ConversationList />
                </div>
                <div className="scrollable content p-0">
                    <MessageList />
                </div>
                <div className="sidebar d-none d-lg-block">
                    <InfoList />
                </div>
            </div>
        </div>
    )
}

export default memo(observer(ChatIndex));