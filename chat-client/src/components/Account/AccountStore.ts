import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { getAllFriend } from 'src/services/UserService';

class AccountStore {
    friendList = [];

    constructor() {
        makeAutoObservable(this);
    }

    AllFriends = async () => {
        try {
            const { data } = await getAllFriend();
            this.friendList = data;
            console.log(data);
            return data;
        } catch (error) {
            toast.error("Something went wrong :(");
        }
    }
}

export default AccountStore;