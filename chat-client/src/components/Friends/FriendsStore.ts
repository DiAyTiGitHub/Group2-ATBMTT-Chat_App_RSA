import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { getAllUsers, searchUsers, searchUsersExcludeSelf } from 'src/services/UserService';

class FriendsStore {
    usersList = [];

    constructor() {
        makeAutoObservable(this);
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
}

export default FriendsStore;