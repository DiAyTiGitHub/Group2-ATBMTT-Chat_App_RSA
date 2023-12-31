import React from "react";
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import { Grid } from "@mui/material";
import "./UserFriendsList.css";
import FriendItemCard from "./FriendItemCard";
import { memo } from "react";

const FriendsList: React.FC = () => {
  const { userProfileStore } = useStore();
  const { friendList, viewingProfile } = userProfileStore;

  console.log("checking friendlist: ", friendList);

  return (
    <div className="p-3">
      <h3>{viewingProfile?.username}'s friends</h3>
      <Grid container spacing={2}>
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
      </Grid>
    </div>
  );
};

export default memo(observer(FriendsList));
