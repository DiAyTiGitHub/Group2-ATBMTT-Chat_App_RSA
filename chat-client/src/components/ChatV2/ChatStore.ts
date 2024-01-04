import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import LocalStorage from "src/common/LocalStorage";
import { getAllJoinedRooms, getAvatarURL } from "src/services/UserService";
import {
  searchJoinedRooms,
  createGroupChat,
  updateRoomInfo,
  unjoinAnGroupChat,
  addSingleUserIntoGroupChat,
  getListFriendNotInRoom,
  addMultipleUsersIntoGroupChat,
  uploadRoomAvatar
} from "src/services/RoomService";
import RSAService from "../Auth/RSAService";

class ChatStore {
  isLoading = true;

  setIsLoading = (state: boolean) => {
    if (this.isLoading != state)
      this.isLoading = state;
  }

  stompClient = null;

  setStompClient = (stompClient: any) => {
    this.stompClient = stompClient;
  };

  constructor() {
    makeAutoObservable(this);
  }



  // Mã hoá
  encryptRSA = (messageContent: string) => {
    try {
      const { n, e } = this.chosenRoom.publicKey;
      let encryptedChar = [];
      for (let i = 0; i < messageContent.length; i++) {
        let charCode = messageContent.charCodeAt(i);
        encryptedChar[i] = RSAService.mod(charCode, e, n);
      }
      let encryptedString = encryptedChar.join(',');
      return (encryptedString);
    }
    catch (error) {
      console.log("Error" + error.message);
      toast.error('RSA encryption error!')
    }
  };

  rsaDecrypt = (messageContent: string, type: string, privateKey: any) => {
    let plaintext = "";
    const { n, d } = privateKey;

    if (type == "chat") {
      try {
        var mang = messageContent.split(",").map(Number);

        for (let i = 0; i < mang.length; i++) {
          let decryptedCharCode = RSAService.mod(mang[i], d, n);
          plaintext += String.fromCharCode(decryptedCharCode);
        }

        console.log("Running, we are decoding message!");

        return plaintext;
      } catch (error) {
        console.log("Error :" + error.message);
        toast.error('RSA decryption error!')
      }
    }

    return messageContent;
  };

  sendMessage = (messageContent: string) => {
    if (!messageContent || messageContent.length === 0) {
      return;
    }
    try {
      const currentUser = LocalStorage.getLoginUser();

      const chatMessage = {
        content: this.encryptRSA(messageContent),
        room: { id: this.chosenRoom.id },
        messageType: { name: "chat" },
        user: currentUser,
      };
      console.log("msg content: " + this.encryptRSA(messageContent));

      this.stompClient.send(
        "/app/privateMessage",
        {},
        JSON.stringify(chatMessage)
      );
    } catch (err) {
      if (err?.response?.status === 401)
        toast.error("You don't have permission to access this conversation anymore :(");
      else {
        console.log(err);
        toast.error("Error occured when sending message, please try again :(");
      }
      throw new Error(err);
    }
  };





  registerUser = () => {
    if (this.stompClient) return;
    this.connect();
  };

  disconnectStompClient = () => {
    if (this.stompClient)
      this.stompClient.disconnect();

    this.joinedRooms = [];
    this.chosenRoom = null;
  }

  connect = () => {
    let Sock = new SockJS("http://localhost:8000/ws");
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    const currenUser = LocalStorage.getLoginUser();
    this.stompClient.subscribe(
      "/user/" + currenUser.id + "/privateMessage",
      this.onReceiveRoomMessage
    );
  };

  onReceiveRoomMessage = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    const roomId = payloadData?.room?.id;
    if (!roomId) {
      toast.error("Received message errors!");
      return;
    }

    let isExisted = null;
    for (let i = 0; i < this.joinedRooms.length; i++) {
      const currentRoom = this.joinedRooms[i];
      if (currentRoom.id === roomId) {
        if (!currentRoom.messages) currentRoom.messages = [];
        currentRoom.messages.push(payloadData);
        this.joinedRooms[i] = { ...currentRoom };
        isExisted = i;

        if (currentRoom?.id === this?.chosenRoom?.id) {
          this.chosenRoom = { ...currentRoom };
        }
      }
    }

    if (isExisted || isExisted == 0) {
      const temp = this.joinedRooms[isExisted];
      for (let i = isExisted; i >= 1; i--) {
        this.joinedRooms[i] = this.joinedRooms[i - 1];
      }
      this.joinedRooms[0] = temp;
      this.joinedRooms = [...this.joinedRooms];
    } else {
      const newRoom = payloadData.room;
      const firstMessage = {
        ...payloadData,
        room: null
      };
      newRoom.messages = [firstMessage];
      this.joinedRooms.unshift(newRoom);
      this.joinedRooms = [...this.joinedRooms];
    }
  };

  onError = (err: any) => {
    console.log(err);
    toast.error("Connect to chat server error, please try again!");
  };

  chosenRoom = null;
  setChosenRoom = (chosenRoom: any) => {
    this.chosenRoom = chosenRoom;
  };

  joinedRooms = [];
  getAllJoinedRooms = async () => {
    if (!this.stompClient) {
      toast.error(
        "You haven't connected to chat server! Please login again!"
      );
      return;
    }

    this.joinedRooms = [];
    this.chosenRoom = null;

    try {

      const { data } = await getAllJoinedRooms();
      this.joinedRooms = data;
      this.chosenRoom = data[0];

    } catch (error) {
      console.log(error);
      toast.error("Load conversation fail, please try again!");
    }
  };

  searchJoinedRooms = async (keyword: string) => {
    try {
      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        return;
      }

      const searchObject = {
        keyword: keyword,
      };
      const { data } = await searchJoinedRooms(searchObject);
      this.joinedRooms = data;
    } catch (err) {
      console.log(err);
      toast.error("Find conversation errors :( Please try again!");
      throw new Error(err);
    }
  };

  createGroupChat = async (room: any) => {
    toast.info("Please wait, we're handling your request!");
    try {
      this.setIsLoading(true);
      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

      const { data } = await createGroupChat(room);
      // console.log("new group chat: ", data);
      await this.getAllJoinedRooms();

      this.setIsLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Create new group chat fail, please try again!");
      throw new Error(err);
    }
  }

  updateRoomInfo = async (room: any) => {

    try {
      this.setIsLoading(true);

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

      const incomingRoom = { ...this.chosenRoom };

      if (room?.color) incomingRoom.color = room.color;
      if (room?.name) incomingRoom.name = room.name;
      if (room?.description) incomingRoom.description = room.description;

      const { data } = await updateRoomInfo(incomingRoom);

      await this.getAllJoinedRooms();

      console.log("updated group chat: ", data);

      // await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  leaveConversation = async () => {
    try {
      this.setIsLoading(true);

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

      const { data } = await unjoinAnGroupChat(this.chosenRoom?.id);

      console.log("updated group chat: ", data);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  addNewParticipant = async (userId: string) => {
    try {
      this.setIsLoading(true);

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

      const { data } = await addSingleUserIntoGroupChat(userId, this.chosenRoom?.id);

      console.log("updated group chat: ", data);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  notJoinedFriends = [];
  getListFriendNotInRoom = async () => {
    try {
      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        return;
      }

      const { data } = await getListFriendNotInRoom(this.chosenRoom?.id);

      this.notJoinedFriends = data;

      return data;
    } catch (err) {
      console.log(err);
      toast.error("Cannot get list unjoined friends, please try again!");
      throw new Error(err);
    }
  }

  addMultipleUsersIntoGroupChat = async (userIds: any) => {
    try {
      this.setIsLoading(true);

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

      const { data } = await addMultipleUsersIntoGroupChat(userIds, this.chosenRoom?.id);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  uploadRoomAvatar = async (image: any) => {
    try {
      this.setIsLoading(true);

      const { data } = await uploadRoomAvatar(image, this.chosenRoom?.id);
      console.log("image path: " + data);
      const imageSrc = await this.getAvatarSrc(data);

      await this.getAllJoinedRooms();

      this.setIsLoading(false);

      return imageSrc;
    } catch (error) {
      this.setIsLoading(false);
      console.error('Error updating user info in AccountStore:', error);
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  }

  getAvatarSrc = async (avatarUrl: string) => {
    if (!avatarUrl) return;

    try {
      const response = await getAvatarURL(avatarUrl);

      // Convert the binary data to a base64 string
      const base64Image = btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // Set the base64 string as the source for the img element
      return (`data:${response.headers['content-type']};base64,${base64Image}`);
    } catch (error) {
      console.error('Error getting avatar:', error);
      // Handle errors as needed
    }
  }
}

export default ChatStore;
