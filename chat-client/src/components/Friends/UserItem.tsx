// import { observer } from 'mobx-react';
// import React, { useCallback, useEffect, useState } from 'react';
// import PersonIcon from '@mui/icons-material/Person';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import Tooltip from '@mui/material/Tooltip';
// import { useStore } from 'src/stores';
// import LocalStorage from 'src/common/LocalStorage';
// import { useNavigate } from 'react-router';
// import { IconButton } from '@mui/material';

// function UserItem({ userInfo }: any) {
//     const navigate = useNavigate();

//     const { friendsStore, authStore } = useStore();
//     const {
//         addFriend,
//         addFriendUsers,
//         pendingFriendUsers,
//         acceptFriend,
//         currentFriends,
//         unFriend
//     } = friendsStore;

//     const {
//         createNotificationForUserByUserId,
//         currentLoginUser
//     } = authStore;

//     const [friendstatus, setFriendStatus] = useState("Kết bạn");

//     useEffect(() => {
//         // setFriendStatus(checkFriendStatus());
//         checkFriendStatus();
//         console.log(friendstatus);
//     }, [addFriendUsers, userInfo]);

//     function checkFriendStatus() {
//         addFriendUsers.forEach(function (request) {
//             if (request?.requestSender?.id == userInfo?.id) {
//                 setFriendStatus("Chấp nhận kết bạn");
//             }
//         });
//         pendingFriendUsers.forEach(function (request) {
//             if (request?.receiver?.id == userInfo?.id) setFriendStatus("Hủy gửi kết bạn");
//         });
//         currentFriends.forEach(function (request) {
//             if (request?.id == userInfo?.id) setFriendStatus("Hủy kết bạn");
//         })
//     }

//     function handleClickAddFriend() {
//         addFriend(userInfo);
//         setFriendStatus("Hủy gửi kết bạn");
//         const notification = {
//             content: currentLoginUser?.username + " sended you an add friend request!",
//             user: userInfo
//         };
//         console.log("checking notification: ", notification);
//         // createNotificationForUserByUserId(notification);
//     }

//     async function handleClickAcceptFriendRequest() {
//         let relationship = null;
//         addFriendUsers.forEach(function (request) {
//             if (request?.requestSender?.id == userInfo?.id) relationship = request;
//         });
//         await acceptFriend(relationship);
//         setFriendStatus("Hủy kết bạn");
//         const notification = {
//             content: currentLoginUser?.username + " accepted your add friend request!",
//             user: userInfo
//         };
//         console.log("checking notification: ", notification);
//         // createNotificationForUserByUserId(notification);
//     }

//     function handleClickUnfriend() {
//         unFriend(userInfo);
//         setFriendStatus("Kết bạn");
//     }

//     function handleClickButton() {
//         if (friendstatus == "Chấp nhận kết bạn") {
//             handleClickAcceptFriendRequest();
//         }
//         else if (friendstatus == "Hủy gửi kết bạn" || friendstatus == "Hủy kết bạn") {
//             handleClickUnfriend();
//         }
//         else if (friendstatus == "Kết bạn") {
//             handleClickAddFriend();
//         }
//     }

//     function renderButton() {
//         if (friendstatus == "Chấp nhận kết bạn") {
//             return  <IconButton>
//                         <PersonAddAlt1Icon fontSize='large'></PersonAddAlt1Icon>
//                     </IconButton>
                   
                    
//         }
//         else if (friendstatus == "Hủy gửi kết bạn" || friendstatus == "Hủy kết bạn") {
//             return  <IconButton>
//                         <PersonRemoveIcon fontSize='large'></PersonRemoveIcon>
//                     </IconButton>
//         }
//         else if (friendstatus == "Kết bạn") {
//             return  <IconButton>
//                         <PersonAddAlt1Icon fontSize='large'></PersonAddAlt1Icon>
//                     </IconButton>
//         }    
//     }

//     return (
//         <div className="appCard flex w-100 br-10  userItem over-hidden">
//             <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user image"
//                 className='w-auto h-88 br-50p'
//             />
//             <div className="userItemContent flex-1 p-3">
//                 <h6 className="p-0 m-0 pointer">
//                     {userInfo?.fullname ? (
//                         <>{userInfo?.fullname} - ' ' {userInfo?.username}</>
//                     ) : (
//                         <>{userInfo?.username}</>
//                     )}
//                 </h6>
//             </div>
//             <div className="userItemAction flex-center flex-column p-3">
//                 {
//                     LocalStorage.getLoginUser()?.id == userInfo?.id ? (
//                         <IconButton onClick={function () {
//                             navigate("/account");
//                         }}>
//                             <PersonIcon fontSize='large'></PersonIcon>
//                         </IconButton>
//                     ) : (
//                         <div>{renderButton()}</div>
//                     )
//                 }

//             </div>
//         </div>
//     );

// }

// export default React.memo(observer(UserItem));

import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from 'src/stores';
import LocalStorage from 'src/common/LocalStorage';
import { useNavigate } from 'react-router';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';


function UserItem({ userInfo }: any) {
    const navigate = useNavigate();
    const MY_USER_ID = LocalStorage.getLoginUser()?.username;
    const { friendsStore, authStore } = useStore();
    let avatar = userInfo.avatar != null ? userInfo.avatar : 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
    const {
        addFriend,
        addFriendUsers,
        pendingFriendUsers,
        acceptFriend,
        currentFriends,
        unFriend
    } = friendsStore;

    const {
        createNotificationForUserByUserId,
        currentLoginUser
    } = authStore;

    const [friendstatus, setFriendStatus] = useState("Kết bạn");

    useEffect(() => {
        // setFriendStatus(checkFriendStatus());
        checkFriendStatus();
        console.log(friendstatus);
    }, [addFriendUsers, userInfo]);

    function checkFriendStatus() {
        addFriendUsers.forEach(function (request) {
            if (request?.requestSender?.id == userInfo?.id) {
                setFriendStatus("Chấp nhận kết bạn");
            }
        });
        pendingFriendUsers.forEach(function (request) {
            if (request?.receiver?.id == userInfo?.id) setFriendStatus("Hủy gửi kết bạn");
        });
        currentFriends.forEach(function (request) {
            if (request?.id == userInfo?.id) setFriendStatus("Hủy kết bạn");
        })
    }

    function handleClickAddFriend() {
        addFriend(userInfo);
        setFriendStatus("Hủy gửi kết bạn");
        const notification = {
            content: currentLoginUser?.username + " sended you an add friend request!",
            user: userInfo
        };
        console.log("checking notification: ", notification);
        // createNotificationForUserByUserId(notification);
    }

    async function handleClickAcceptFriendRequest() {
        let relationship = null;
        addFriendUsers.forEach(function (request) {
            if (request?.requestSender?.id == userInfo?.id) relationship = request;
        });
        await acceptFriend(relationship);
        setFriendStatus("Hủy kết bạn");
        const notification = {
            content: currentLoginUser?.username + " accepted your add friend request!",
            user: userInfo
        };
        console.log("checking notification: ", notification);
        // createNotificationForUserByUserId(notification);
    }

    function handleClickUnfriend() {
        unFriend(userInfo);
        setFriendStatus("Kết bạn");
    }

    function handleClickButton() {
        if (friendstatus == "Chấp nhận kết bạn") {
            handleClickAcceptFriendRequest();
        }
        else if (friendstatus == "Hủy gửi kết bạn" || friendstatus == "Hủy kết bạn") {
            handleClickUnfriend();
        }
        else if (friendstatus == "Kết bạn") {
            handleClickAddFriend();
        }
    }

    return (
        // <div className="appCard flex w-100 br-10  userItem over-hidden">
        //     <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user image"
        //         className='w-auto h-88 br-50p'
        //     />
        //     <div className="userItemContent flex-1 p-3">
        //         <h6 className="p-0 m-0 pointer">
        //             {userInfo?.fullname ? (
        //                 <>{userInfo?.fullname} - ' ' {userInfo?.username}</>
        //             ) : (
        //                 <>{userInfo?.username}</>
        //             )}
        //         </h6>
        //     </div>
        //     <div className="userItemAction flex-center flex-column p-3">
        //         {
        //             LocalStorage.getLoginUser()?.id == userInfo?.id ? (
        //                 <button className='pointer br-10' onClick={function () {
        //                     navigate("/account");
        //                 }} type='button'>
        //                     <h6 className='p-0 m-0'>
        //                         Xem thông tin cá nhân
        //                     </h6>
        //                 </button>
        //             ) : (
        //                 <button className='pointer br-10' onClick={handleClickButton} type='button'>
        //                     <h6 className='p-0 m-0'>
        //                         {
        //                             friendstatus
        //                         }
        //                     </h6>
        //                 </button>
        //             )
        //         }

        //     </div>
        // </div>
        <div>
        {MY_USER_ID != userInfo.username && (
            <Card sx={{ width: 300 }}>
                <div>
                    <Typography level="title-lg">
                        {userInfo.username}    
                    </Typography>
                    
                    { userInfo?.fullname &&
                        <Typography level="title-lg">
                            {userInfo?.fullname}
                        </Typography>
                    }
                </div>
                <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                    src={avatar}
                    loading="lazy"
                    alt=""
                    />
                </AspectRatio>
                <CardContent orientation="horizontal">
                    <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ width:"100%", alignSelf: 'center', fontWeight: 600 }}
                    onClick={handleClickButton}
                    >
                        { friendstatus }
                    </Button>
                </CardContent>
            </Card>
        )}
        </div>
    );

}

export default React.memo(observer(UserItem));