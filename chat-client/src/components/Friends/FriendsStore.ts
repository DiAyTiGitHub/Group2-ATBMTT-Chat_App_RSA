import { makeAutoObservable, observable, action } from 'mobx';
import { toast } from 'react-toastify';
import { getAllUsers, searchUsers, searchUsersExcludeSelf } from 'src/services/UserService';

class FriendsStore {
    usersList = [];
    friendshipStatus = {};

    constructor() {
        makeAutoObservable(this
            , {
            friendshipStatus: observable,
            updateFriendshipStatus: action,}
            );
    }

    allUsers = async () => {
        try {
            const { data } = await getAllUsers();
            this.usersList = data;
            return data;
        }
        catch (error) {
            toast.error("Something went wrong :(");
        }
    }

    searchUserByKeyword = async (keyword: string) => {
        if (keyword.trim() == "") {
            return this.allUsers();
        }
        else {
            const searchObject = {
                keyword: keyword
            };
            try {
                const { data } = await searchUsersExcludeSelf(searchObject);
                this.usersList = data;
                return data;
            }
            catch (error) {
                toast.error("Something went wrong :(");
                throw new Error(error);
            }
        }
    }

    updateFriendshipStatus(userId, response) {
        if (response) {
          this.friendshipStatus[userId] = response; // Assuming the response contains friendship status
        } else {
          // Handle error or update state accordingly
        }
      }
}

export default FriendsStore;