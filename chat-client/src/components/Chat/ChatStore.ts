import { makeAutoObservable } from 'mobx';
import { toast } from "react-toastify";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import LocalStorage from 'src/common/LocalStorage';
import { getAllJoinedRooms } from 'src/services/UserService';

class ChatStore {
    stompClient = null;

    setStompClient = (stompClient: any) => {
        this.stompClient = stompClient;
    }

    constructor() {
        makeAutoObservable(this);
    }

    sendMessage = (messageContent: string) => {
        if (!messageContent || messageContent.length === 0) {
            return;
        }
        try {
            const currentUser = LocalStorage.getLoginUser();

            const chatMessage = {
                content: messageContent,
                room: { id: this.chosenRoom.id },
                messageType: { name: "chat" },
                user: currentUser
            };

            this.stompClient.send("/app/privateMessage", {}, JSON.stringify(chatMessage));
        }
        catch (err) {
            console.log(err);
            toast.error("Error occured when sending message, please try again :(");
            throw new Error(err);
        }
    }

    registerUser = () => {
        this.connect();
    }

    connect = () => {
        let Sock = new SockJS('http://localhost:8000/ws');
        this.stompClient = over(Sock);
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        const currenUser = LocalStorage.getLoginUser();
        this.stompClient.subscribe('/user/' + currenUser.id + '/privateMessage', this.onReceiveRoomMessage);
    }

    onError = (err: any) => {
        console.log(err);
        toast.error("Connect to chat server error, please try again!");
    }

    onReceivedPrivateMessage = (payload: any) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        console.log("recieved message: ", payloadData);
    }

    chosenRoom = null;
    setChosenRoom = (chosenRoom: any) => {
        this.chosenRoom = chosenRoom;
    }

    joinedRooms = [];
    getAllJoinedRooms = async () => {
        console.log("getAllJoinedRooms is called");
        try {
            const { data } = await getAllJoinedRooms();
            this.joinedRooms = data;
            this.chosenRoom = data[0];

            if (!this.stompClient) {
                toast.error("You haven't connected to chat server! Please login again!");
                return;
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Load conversation fail, please try again!");
        }
    }

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
                currentRoom.messages.push(payloadData);
                this.joinedRooms[i] = { ...currentRoom };
                isExisted = i;

                if (currentRoom.id === this.chosenRoom.id) {
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
        }
        else {
            const newRoom = payloadData.room;
            this.joinedRooms.unshift(newRoom);
            this.joinedRooms = [...this.joinedRooms];
        }

    }


}

export default ChatStore;