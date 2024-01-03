import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { getAllFriendOfUser, getUserById } from 'src/services/UserService';

class AccountStore {
  friendList = [];
  viewingProfile = null;
  isLoading = true;

  setIsLoading = (state: boolean) => {
    if (this.isLoading != state)
      this.isLoading = state;
  }

  constructor() {
    makeAutoObservable(this);
  }

  getUserById = async (userId: string) => {
    try {
      const { data } = await getUserById(userId);
      this.viewingProfile = data;
      this.getAllFriendOfUser(userId);
      return data;
    }
    catch (err) {
      console.error(err);
      toast.error("Cannot get profile of this user, please try again :(");
    }
  }

  getAllFriendOfUser = async (userId: string) => {
    try {
      const { data } = await getAllFriendOfUser(userId);
      this.friendList = data;
      return data;
    }
    catch (err) {
      console.error(err);
      toast.error("Cannot get profile of this user, please try again :(");
    }
  }


}

export default AccountStore;