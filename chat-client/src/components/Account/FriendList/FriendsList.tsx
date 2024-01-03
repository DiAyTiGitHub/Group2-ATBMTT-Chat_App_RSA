import React from "react";
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import { Grid } from "@mui/material";
import "./FriendsList.css";
import FriendItemCard from "./FriendItemCard";
import { memo } from "react";
import FriendListLoadingSkeleton from "./FriendListLoadingSkeleton";

const FriendsList: React.FC = () => {
  const { accountStore } = useStore();
  const {
    friendList,
    isLoading
  } = accountStore;

  return (
    <div className="p-3">
      <h4>My Friends</h4>
      <Grid container spacing={2}>
        {isLoading ? (
          <>
          {
            [1, 2, 3, 4].map(function(_, index) {
              return(
                  <FriendListLoadingSkeleton key={index}/>
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
            {(!friendList || friendList.length === 0) && (
              <div className="flex-center w-100">
                <h5 className="p-0 m-0">You have no friend yet</h5>
              </div>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default memo(observer(FriendsList));
