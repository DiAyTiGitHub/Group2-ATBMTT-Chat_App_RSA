import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { useStore } from 'src/stores';
import LocalStorage from 'src/common/LocalStorage';
import { useNavigate } from 'react-router';

function UserItem({ userInfo }: any) {
    const navigate = useNavigate();

    const { friendsStore } = useStore();
    const {
        addFriend,
        addFriendUsers,
        pendingFriendUsers,
        acceptFriend,
        currentFriends
    } = friendsStore;

    function handleClickAddFriend() {
        addFriend(userInfo);
    }

    function checkFriendStatus() {
        let message = "Kết bạn";
        addFriendUsers.forEach(function (request) {
            console.log(request);
            if (request?.requestSender?.id == userInfo?.id) message = "Chấp nhận kết bạn";
        });
        pendingFriendUsers.forEach(function (request) {
            if (request?.receiver?.id == userInfo?.id) message = "Đang chờ phản hồi";
        });
        return message;
    }

    function handleClickButton() {
        const status = checkFriendStatus();
        if (status == "Chấp nhận kết bạn") {
            let relationship = null;
            addFriendUsers.forEach(function (request) {
                if (request?.requestSender?.id == userInfo?.id) relationship = request;
            });
            acceptFriend(relationship);
            navigate("/friends");
        }
        else if (status == "Đang chờ phản hồi") {
            console.log("unfriended")
        }
        else if (status == "Kết bạn") {
            handleClickAddFriend();
        }
    }


    return (
        <div className="appCard flex w-100 br-10  userItem over-hidden">
            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user image"
                className='w-auto h-88 br-50p'
            />
            <div className="userItemContent flex-1 p-3">
                <h6 className="p-0 m-0 pointer">
                    {userInfo?.fullname ? (
                        <>{userInfo?.fullname} - ' ' {userInfo?.username}</>
                    ) : (
                        <>{userInfo?.username}</>
                    )}
                </h6>
            </div>
            <div className="userItemAction flex-center flex-column p-3">
                {
                    LocalStorage.getLoginUser()?.id == userInfo?.id ? (
                        <button className='pointer br-10' onClick={function () {
                            navigate("/account");
                        }} type='button'>
                            <h6 className='p-0 m-0'>
                                Xem thông tin cá nhân
                            </h6>
                        </button>
                    ) : (
                        <button className='pointer br-10' onClick={handleClickButton} type='button'>
                            <h6 className='p-0 m-0'>
                                {
                                    checkFriendStatus()
                                }
                            </h6>
                        </button>
                    )
                }

            </div>
        </div>
    );

}

export default React.memo(observer(UserItem));