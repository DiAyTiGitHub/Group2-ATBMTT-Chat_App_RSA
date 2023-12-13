import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { getAllFriend, updateUserInfo } from 'src/services/UserService';

class AccountStore {
    friendList = [];

    constructor() {
        makeAutoObservable(this);
    }

    allFriends = async () => {
        try {
            const { data } = await getAllFriend();
            this.friendList = data;
            console.log(data);
            return data;
        } catch (error) {
            toast.error("Something went wrong :(");
        }
    }

    updateUserInfo = async (userDTO) => {
        try {
          const updatedUserInfo = await updateUserInfo(userDTO);
          // Xử lý dữ liệu cập nhật nếu cần thiết
          console.log('User info updated successfully:', updatedUserInfo);
        } catch (error) {
          console.error('Error updating user info in AccountStore:', error);
          // Xử lý lỗi nếu cần thiết
          throw error;
        }
      }
}

export default AccountStore;