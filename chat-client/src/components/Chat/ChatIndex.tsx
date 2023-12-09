import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import 'src/index.css';

function ChatIndex() {
    const { chatStore, authStore } = useStore();

    const { publicMessageStack, registerUser } = chatStore;
    const {authenticatedUser} = authStore;

    const navigate = useNavigate();
    useEffect(function () {
        if (!authenticatedUser) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            registerUser();
        }
    }, []);

    const {
        sendPrivateValue,
        sendValue,
    } = chatStore;

    const [tab, setTab] = useState("ChatIndex");
    const [publicMessage, setPublicMessage] = useState("");
    const [privateMessage, setPrivateMessage] = useState("");

    function handleChangePrivateMessage(event: any) {
        const { value } = event.target;
        setPrivateMessage(value);
    }

    function handleChangePublicMessage(event: any) {
        const { value } = event.target;
            setPublicMessage(value);
    }

    function handleSendPublicMessage() {
        sendValue(publicMessage);
    }

    function handleSendPrivateMessage() {
        sendPrivateValue(privateMessage);
    }

    const currentUser = LocalStorage.getLoginUser();

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
                        {publicMessageStack.map((chat, index) => (
                            <li className={`message ${chat.senderName === currentUser?.username && "self"}`} key={index}>
                                {chat.senderName !== currentUser?.username && <div className="avatar">{chat.senderName}</div>}
                                <div className="message-data">{chat.messageBody}</div>
                                {chat.senderName === currentUser?.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={publicMessage} onChange={handleChangePublicMessage} />
                        <button type="button" className="send-button" onClick={handleSendPublicMessage}>send</button>
                    </div>
                </div>}
                {tab !== "ChatIndex" && <div className="chat-content">
                    <ul className="chat-messages">
                        {[].map((chat, index) => (
                            <li className={`message ${chat.senderName === currentUser?.username && "self"}`} key={index}>
                                {chat.senderName !== currentUser?.username && <div className="avatar">{chat.senderName}</div>}
                                <div className="message-data">{chat.messageBody}</div>
                                {chat.senderName === currentUser?.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={privateMessage} onChange={handleChangePrivateMessage} />
                        <button type="button" className="send-button" onClick={handleSendPrivateMessage}>send</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default memo(observer(ChatIndex));