import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

function ChatIndex() {
    // data test vì không biết dùng csdl hihi
    const testData = [
        {chat:{senderName: "Hoa", messageBody: "test text"}, index: 1},
        {chat:{senderName: "diayti", messageBody: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum"}, index: 2},
        {chat:{senderName: "Hoa", messageBody: "test text"}, index: 3},
        {chat:{senderName: "diayti", messageBody: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum"}, index: 4},
        {chat:{senderName: "Hoa", messageBody: "test"}, index: 5},
    ];
    

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
        <div className="container">
            <div className="chat-box">
                <div className="member-list">
                    <ul>
                        <li onClick={() => { setTab("ChatIndex") }} className={`member ${tab === "ChatIndex" && "active"}`}>Public chat</li>
                        {[].map((name, index) => (
                            <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
                {tab === "ChatIndex" && <div className="chat-content">
                    <ul className="chat-messages">
                        {testData.map((chat, index) => (

                            <li className={(chat.chat.senderName === userData?.username) ? "message self" : "message"} key={index}>
                                {chat.chat.senderName !== userData?.username && <img src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" className="avatar"/>}
                                <div className='message-text'>
                                    <div className="sender-name">{chat.chat.senderName}</div>
                                    <div className="message-data">{chat.chat.messageBody}</div>
                                </div>
                            </li>

                            // <li className={`message self ${chat.chat.senderName === userData?.username && "self"}`} key={index}>
                            //     {chat.chat.senderName !== userData?.username && <img src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" className="avatar"/>}                               
                            //     {chat.chat.senderName !== userData?.username && <div className="sender-name">{chat.chat.senderName}</div>}
                            //     <div className="message-data">{chat.chat.messageBody}</div>
                                
                            // </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={publicMessage} onChange={handleChangePublicMessage} />
                        <button type="button" className="send-button" onClick={handleSendPublicMessage}>send</button>
                    </div>
                </div>}
               
            </div>
        </div>
    )
}

export default memo(observer(ChatIndex));