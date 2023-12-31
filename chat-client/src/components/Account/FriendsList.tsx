// // FriendsList.tsx
// import React from "react";
// import { useObserver } from 'mobx-react';
// import { useStore } from 'src/stores';
// import { Grid } from "@mui/material";
// import { useNavigate } from "react-router";

// const FriendsList: React.FC = () => {
//   const navigate = useNavigate();

//   const { accountStore } = useStore();
//   const {
//     friendList,
//   } = accountStore;

//   return (
//     <div className="p-3">
//       <h2>My Friends</h2>
//       <ul className="m-0 p-0">
//         {
//           friendList.map(function (friend, index) {
//             return (
//               <Grid item xs={12} key={index} className="p-0 m-0 w-100 py-2">
//                 {/* <UserItem userInfo={friend} /> */}
//                 <div className="appCard flex w-100 br-10  userItem over-hidden">
//                   <img src={friend.avatar} alt="user image"
//                     className='w-auto h-88 br-50p'
//                   />
//                   <div className="userItemContent flex-1 p-3">
//                     <h6 className="p-0 m-0 pointer">
//                       {friend?.fullname ? (
//                         <>{friend?.username} - ' ' {friend?.fullname}</>
//                       ) : (
//                         <>{friend?.username}</>
//                       )}
//                     </h6>
//                   </div>
//                   <div className="userItemAction flex-center flex-column p-3">
//                     {

//                       <button className='pointer br-10' onClick={function () {
//                         navigate("/chat");
//                       }} type='button'>
//                         <h6 className='p-0 m-0'>
//                           Nhắn tin
//                         </h6>
//                       </button>
//                     }
//                   </div>
//                 </div>
//               </Grid>
//             );
//           })
//         }
//       </ul>
//     </div>
//   );
// };

// export default FriendsList;
// FriendsList.tsx
// import React, { useEffect, useState } from "react";
// import { useObserver } from "mobx-react";
// import { useStore } from "src/stores";
// import { Grid, Avatar, Button } from "@mui/material";
// import { useNavigate } from "react-router";
// import "./FriendsList.css";

// const FriendsList: React.FC = () => {
//   const navigate = useNavigate();
//   const { accountStore } = useStore();
//   const [friendList, setFriendList] = useState([]);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const friends = await accountStore.getAllFriends();
//         setFriendList(friends);
//         console.log("Friend List:", friends); // In giá trị friendList ra console
//       } catch (error) {
//         console.error("Error fetching friends:", error);
//       }
//     };

//     fetchFriends();
//   }, [accountStore]);

//   return (
//     <div className="p-3">
//       <h2>My Friends</h2>
//       <Grid container spacing={2}>
//         {friendList.map(function (friend, index) {
//           let avatar = friend.avatar != null ? friend.avatar : 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <div className="friendBlock">
//                 <img
//                   src={avatar}
//                   alt="user image"
//                   className="object-cover"
//                 />
//                 <div className="friendInfo">
//                   <h6 className="friendName">
//                     {friend?.fullname ? (
//                       <>
//                         {friend?.username} - ' ' {friend?.fullname}
//                       </>
//                     ) : (
//                       <>{friend?.username}</>
//                     )}
//                   </h6>
//                   <Button
//                     className="pointer br-10"
//                     onClick={() => navigate("/chat")}
//                     type="button"
//                   >
//                     Nhắn tin
//                   </Button>
//                 </div>
//               </div>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </div>
//   );
// };

// export default FriendsList;

// FriendsList.tsx
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import { Grid } from "@mui/material";
import "./FriendsList.css";
import FriendItemCard from "./FriendItemCard";
import { memo } from "react";

const FriendsList: React.FC = () => {
  const { accountStore } = useStore();
  const { friendList } = accountStore;

  return (
    <div className="p-3">
      <h3>My Friends</h3>
      <Grid container spacing={2}>
        {friendList.map(function (friend, index) {
          return (
            <FriendItemCard friend={friend} key={index} />
          );
        })}
        {(!friendList || friendList.length === 0) && (
          <div className="flex-center w-100">
            <h5 className="p-0 m-0">You have no friend yet</h5>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default memo(observer(FriendsList));
