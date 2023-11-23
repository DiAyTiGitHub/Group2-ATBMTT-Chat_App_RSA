import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';

function ChatIndex() {
    const { authStore, chatStore } = useStore();
    const {
        userData,
    } = authStore;

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
            {userData.connected ?
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
                            {[].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData?.username && "self"}`} key={index}>
                                    {chat.senderName !== userData?.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.messageBody}</div>
                                    {chat.senderName === userData?.username && <div className="avatar self">{chat.senderName}</div>}
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
                                <li className={`message ${chat.senderName === userData?.username && "self"}`} key={index}>
                                    {chat.senderName !== userData?.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.messageBody}</div>
                                    {chat.senderName === userData?.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={privateMessage} onChange={handleChangePrivateMessage} />
                            <button type="button" className="send-button" onClick={handleSendPrivateMessage}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    Chưa có tài khoản, vui lòng đăng nhập trước!
                </div>
            }
        </div>
    )
}

export default memo(observer(ChatIndex));