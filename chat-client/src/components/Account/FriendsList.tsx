// FriendsList.tsx
import React from "react";
import { useObserver } from 'mobx-react';
import { useStore } from 'src/stores';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";

const FriendsList: React.FC = () => {
  const navigate = useNavigate();

  const { accountStore } = useStore();
  const {
    friendList,
  } = accountStore;
  
  return (
    <div className="p-3">
      <h2>My Friends</h2>
      <ul className="m-0 p-0">
        {
          friendList.map(function (friend, index) {
            return (
              <Grid item xs={12} key={index} className="p-0 m-0 w-100 py-2">
                {/* <UserItem userInfo={friend} /> */}
                <div className="appCard flex w-100 br-10  userItem over-hidden">
                  <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user image"
                    className='w-auto h-88 br-50p'
                  />
                  <div className="userItemContent flex-1 p-3">
                    <h6 className="p-0 m-0 pointer">
                      {friend?.fullname ? (
                        <>{friend?.username} - ' ' {friend?.fullname}</>
                      ) : (
                        <>{friend?.username}</>
                      )}
                    </h6>
                  </div>
                  <div className="userItemAction flex-center flex-column p-3">
                    {

                      <button className='pointer br-10' onClick={function () {
                        navigate("/chat-v2");
                      }} type='button'>
                        <h6 className='p-0 m-0'>
                          Nhắn tin
                        </h6>
                      </button>
                    }
                  </div>
                </div>
              </Grid>
            );
          })
        }
      </ul>
    </div>
  );
};

export default FriendsList;
