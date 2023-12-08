import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import Messenger from '../Messenger/Messenger';

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

    const {
        setTab,
        sendPrivateValue,
        sendValue,
        tab,
        privateMessage,
        publicMessage,
        setPrivateMessage,
        setPublicMessage
    } = chatStore;

    function handleChangePrivateMessage(event: any) {
        const { value } = event.target;
        setPrivateMessage(value);
    }

    function handleChangePublicMessage(event: any) {
        const { value } = event.target;
        setPublicMessage(value);
    }

    function handleSendPublicMessage() {
        sendValue(authStore);
    }

    function handleSendPrivateMessage() {
        sendPrivateValue(authStore);
    }

    return (
        <div className="app">
            <Messenger />
        </div>

        
        // <div className="container">
        //     <div className="chat-box">
        //         <div className="member-list">
        //             <ul>
        //                 <li onClick={() => { setTab("ChatIndex") }} className={`member ${tab === "ChatIndex" && "active"}`}>Public chat</li>
        //                 {[].map((name, index) => (
        //                     <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
        //                 ))}
        //             </ul>
        //         </div>
        //         {tab === "ChatIndex" && <div className="chat-content">
        //             <ul className="chat-messages">
        //                 {testData.map((chat, index) => (

        //                     <li className={(chat.chat.senderName === userData?.username) ? "message self" : "message"} key={index}>
        //                         {chat.chat.senderName !== userData?.username && <img src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" className="avatar"/>}
        //                         <div className='message-text'>
        //                             <div className="sender-name">{chat.chat.senderName}</div>
        //                             <div className="message-data">{chat.chat.messageBody}</div>
        //                         </div>
        //                     </li>

        //                     // <li className={`message self ${chat.chat.senderName === userData?.username && "self"}`} key={index}>
        //                     //     {chat.chat.senderName !== userData?.username && <img src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" className="avatar"/>}                               
        //                     //     {chat.chat.senderName !== userData?.username && <div className="sender-name">{chat.chat.senderName}</div>}
        //                     //     <div className="message-data">{chat.chat.messageBody}</div>
                                
        //                     // </li>
        //                 ))}
        //             </ul>

        //             <div className="send-message">
        //                 <input type="text" className="input-message" placeholder="enter the message" value={publicMessage} onChange={handleChangePublicMessage} />
        //                 <button type="button" className="send-button" onClick={handleSendPublicMessage}>send</button>
        //             </div>
        //         </div>}
               
        //     </div>
        // </div>
    )
}

export default memo(observer(ChatIndex));