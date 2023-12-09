import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
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
        currentFriends,
        unFriend
    } = friendsStore;
    const [friendstatus, setFriendStatus] = useState("Kết bạn");

    useEffect(() => {
        // setFriendStatus(checkFriendStatus());
        checkFriendStatus();

        console.log(friendstatus);
        
    }, [addFriendUsers, userInfo]);

    function checkFriendStatus() {
        // let message = "Kết bạn";
        if (addFriendUsers) {
            addFriendUsers.forEach(function (request) {
                if (request?.requestSender?.id == userInfo?.id) {
                    setFriendStatus("Chấp nhận kết bạn");
                }
            });
        }
        pendingFriendUsers.forEach(function (request) {
            if (request?.receiver?.id == userInfo?.id) setFriendStatus("Hủy gửi kết bạn");
        });
        currentFriends.forEach(function (request) {
            if (request?.id == userInfo?.id) setFriendStatus("Hủy kết bạn");
        })

        // return message;
    }

    function handleClickAddFriend() {
        addFriend(userInfo);
        navigate("/friends");
    }

    function handleClickUnfriend() {
        unFriend(userInfo);
    }

    function handleClickButton() {
        // const status = checkFriendStatus();
        if (friendstatus == "Chấp nhận kết bạn") {
            let relationship = null;
            addFriendUsers.forEach(function (request) {
                if (request?.requestSender?.id == userInfo?.id) relationship = request;
            });
            acceptFriend(relationship);
            navigate("/friends");
        }
        else if (friendstatus == "Hủy gửi kết bạn" || friendstatus == "Hủy kết bạn") {
            handleClickUnfriend();
        }
        else if (friendstatus == "Kết bạn") {
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
                                    friendstatus
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