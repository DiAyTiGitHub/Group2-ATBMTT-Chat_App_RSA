import React, { memo, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import UserProfile from "./UserProfile";
import './UserProfileStyles.scss';
import UserFriendsList from "./UserFriendsList";

function UserProfileIndex() {
    const queryParameters = new URLSearchParams(window.location.search)
    const userId = queryParameters.get("userId");

    const navigate = useNavigate();

    const { userProfileStore, authStore } = useStore();

    const {
        getUserById,
        setIsLoading
    } = userProfileStore;

    const { currentLoginUser } = authStore;

    useEffect(function () {
        if (!currentLoginUser) {
            // if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            setIsLoading(true);
            getUserById(userId)
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [userId]);

    return (
        <div className="app flex-center w-100 p-0 m-0 flex-1 align-start">
            <div className="flex-center w-100 p-6 flex-column">
                <div className="appCard br-10" style={{ flex: 3 }}>
                    <UserProfile />
                </div>
                <div className="appCard br-10 mt-4" style={{ flex: 1 }}>
                    <UserFriendsList />
                </div>
            </div>
        </div>
    );
}

export default memo(observer(UserProfileIndex));