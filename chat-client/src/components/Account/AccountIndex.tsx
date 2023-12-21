import React, { memo, useEffect } from "react";
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import UserProfile from "./UserProfile";
import FriendsList from "./FriendsList";
import './AccountStyles.scss';

function AccountIndex() {
    const navigate = useNavigate();

    const { accountStore, authStore } = useStore();
    const {
        allFriends
    } = accountStore;

    const { currentLoginUser } = authStore;

    useEffect(function () {
        // if (!currentLoginUser) {
        if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            allFriends();
        }
    }, []);

    return (
        <div className="app flex-center w-100 p-0 m-0 flex-1 align-start">
            <div className="flex-center w-100 p-6 flex-column">
                <div className="appCard br-10" style={{ flex: 3 }}>
                    <UserProfile />
                </div>
                <div className="appCard br-10 mt-4" style={{ flex: 1 }}>
                    <FriendsList />
                </div>
            </div>
        </div>
    );
}

export default memo(observer(AccountIndex));