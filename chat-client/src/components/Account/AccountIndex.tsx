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

    const { accountStore, authStore } = useStore();
    const {
        allFriends
    } = accountStore;

    const { currentLoginUser } = authStore;

    useEffect(function () {
        if (!currentLoginUser) {
        // if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            allFriends();
        }
    }, []);

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