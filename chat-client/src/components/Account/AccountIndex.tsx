import React, { memo, useEffect } from "react";
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import UserProfile from "./UserProfile";
import FriendsList from "./FriendsList";

function AccountIndex() {
    const navigate = useNavigate();
    
    useEffect(function () {
        AllFriends();
        if (!AllFriends())
            console.log('Calling AllFriends');
        if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
    }, [navigate]);

    const { accountStore } = useStore();
    const {
        AllFriends
    } = accountStore;

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className="appCard p-3 m-5" style={{ flex: 3 }}>
                    <UserProfile />
                </div>
                <div className="appCard p-3 m-5" style={{ flex: 1 }}>
                    <FriendsList />
                </div>
            </div>
        </>
    );
}

export default memo(observer(AccountIndex));