import { makeAutoObservable, observable, action } from 'mobx';
import { toast } from 'react-toastify';
import {
    getAllFriend,
    getAllUsers,
    searchUsers,
    searchUsersExcludeSelf,
    addFriendRequests,
    pendingFriendRequests
} from 'src/services/UserService';
import {
    sendFriendRequest,
    acceptFriendRequest,
    unfriendUser
} from 'src/services/FriendsService';

class FriendsStore {
    usersList = [];
    addFriendUsers = [];
    pendingFriendUsers = [];
    currentFriends = [];

    constructor() {
        makeAutoObservable(this);
    }

    getAddFriendRequests = async () => {
        try {
            const { data } = await addFriendRequests();
            this.addFriendUsers = data;
            return data;
        }
        catch (error) {
            toast.error("Get the list of failed add friends!");
        }
    }

    getPendingFriendRequests = async () => {
        try {
            const { data } = await pendingFriendRequests();
            this.pendingFriendUsers = data;
            return data;
        }
        catch (error) {
            toast.error("Get the list of failed friend requests!");
        }
    }

    allUsers = async () => {
        try {
            const { data } = await getAllUsers();
            this.usersList = data;
            return data;
        }
        catch (error) {
            toast.error("error getting user list data!");
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
                toast.error("Error searching for users using keywords!");
                throw new Error(error);
            }
        }
    }

    addFriend = async (userInfo: any) => {
        try {
            const response = await sendFriendRequest(userInfo?.id);
            console.log('Friend request sent successfully:', response);
            toast.success("Successfully sent friend request to user " + userInfo?.username);
        } catch (error) {
            // console.error('Error sending friend request:', error.message);
            toast.error("Error sending friend request!");

        }
    }

    unFriend = async (userInfo: any) => {
        try {
            const respronse = await unfriendUser(userInfo?.id);
            // console.log(respronse.data);
            toast.success("Successfully unfriended the user " + userInfo?.username);
        } catch (error) {
            console.log("Unfriending error!");
            toast.error("Unfriending error!");
        }
    }

    acceptFriend = async (relationship: any) => {
        try {
            const response = await acceptFriendRequest(relationship?.id);
            toast.success("Successfully accepted the friend request");
        } catch (error) {
            // console.error('Error accepting friend request:', error.message);
            toast.error("Error accepting friend request");

        }
    }

    allFriends = async () => {
        try {
            const { data } = await getAllFriend();
            this.currentFriends = data;
        } catch (error) {
            // console.error('Error retrieving friend list data:', error.message);
            toast.error("Error retrieving friend list data");
        }
    }
}

export default FriendsStore;