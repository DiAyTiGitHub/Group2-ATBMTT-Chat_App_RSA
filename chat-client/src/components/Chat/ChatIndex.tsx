import React, { memo, useEffect, useState } from 'react'
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';

function ChatIndex() {
    const { authStore } = useStore();
    const {
        userData,
        setUserData,
        tab,
        privateChats,
        setPrivateChats,
        publicChats,
        setPublicChats,
        setTab,
        sendPrivateValue,
        sendValue,
        handleMessage
    } = authStore;

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={() => { setTab("ChatIndex") }} className={`member ${tab === "ChatIndex" && "active"}`}>Public chat</li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab === "ChatIndex" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData?.username && "self"}`} key={index}>
                                    {chat.senderName !== userData?.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.messageBody}</div>
                                    {chat.senderName === userData?.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.messageBody} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>}
                    {tab !== "ChatIndex" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData?.username && "self"}`} key={index}>
                                    {chat.senderName !== userData?.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.messageBody}</div>
                                    {chat.senderName === userData?.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.messageBody} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
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