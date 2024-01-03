import React from "react";
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import { Grid, Skeleton } from "@mui/material";
import "./UserFriendsList.css";
import FriendItemCard from "./FriendItemCard";
import { memo } from "react";
import UserFriendsLoadingSkeleton from "./UserFriendsLoadingSkeleton";


const FriendsList: React.FC = () => {
  const { userProfileStore } = useStore();
  const {
    friendList,
    viewingProfile,
    isLoading
  } = userProfileStore;

  return (
    <div className="p-3">
      {isLoading ? (
        <Skeleton animation="wave" variant="text" width={145} height={40} className="mt-2 px-4" />
      ):(
        <h3>{viewingProfile?.username}'s friends</h3>
      )}
      <Grid container spacing={2}>
        {isLoading ? (
          <>
            {
              [1, 2, 3, 4].map(function (_, index) {
                return (
                  <UserFriendsLoadingSkeleton key={index} />
                )
              })
            }
          </>
        ) : (
          <>
            {friendList.map(function (friend, index) {
              return (
                <FriendItemCard friend={friend} key={index} />
              );
            })}
            {!friendList && (
              <div className="flex-center w-100">
                <h5 className="m-0 p-0">This user has no friend yet</h5>
              </div>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default memo(observer(FriendsList));
