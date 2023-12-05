// FriendsList.tsx
import React from "react";
import { useObserver } from 'mobx-react';
import { useStore } from 'src/stores';

const FriendsList: React.FC = () => {
  const { userStore } = useStore();

//   const onlineFriends = userStore.friends.filter(friend => friend.isOnline);

  return useObserver(() => (
    <div>
      <h2>Online Friends</h2>
      <ul>
        {/* {onlineFriends.map(friend => (
          <li key={friend.id}>{friend.username}</li>
        ))} */}
      </ul>
    </div>
  ));
};

export default FriendsList;
