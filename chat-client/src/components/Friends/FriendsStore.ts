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
            toast.error("Something went wrong :(");
        }
    }

    getPendingFriendRequests = async () => {
        try {
            const { data } = await pendingFriendRequests();
            this.pendingFriendUsers = data;
            return data;
        }
        catch (error) {
            toast.error("Something went wrong :(");
        }
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

    addFriend = async (userInfo: any) => {
        try {
            const response = await sendFriendRequest(userInfo?.id);
            console.log('Friend request sent successfully:', response);
            toast.success("Gửi kết bạn thành công đến người dùng " + userInfo?.username);
        } catch (error) {
            console.error('Error sending friend request:', error.message);
            toast.error("Gửi kết bạn có lỗi");

        }
    }

    unFriend = async (userInfo: any) => {
        try {
            console.log('userInfo: ', userInfo);
            await unfriendUser(userInfo?.id);
            console.log('2');
            toast.success("Hủy kết bạn thành công với người dùng " + userInfo?.username);
        } catch (error) {
            toast.error("Hủy kết bạn có lỗi");
        }
    }

    acceptFriend = async (relationship: any) => {
        try {
            const response = await acceptFriendRequest(relationship?.id);
            toast.success("Kết bạn thành công!");
        } catch (error) {
            console.error('Error sending friend request:', error.message);
            toast.error("Gửi kết bạn có lỗi");

        }
    }

    allFriends = async () => {
        try {
            const { data } = await getAllFriend();
            this.currentFriends = data;
        } catch (error) {
            console.error('Error sending friend request:', error.message);
            toast.error("Lấy dữ liệu có lỗi");
        }
    }
}

export default FriendsStore;