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

    sendValue = (publicMessage: string) => {
        if (!publicMessage || publicMessage.length === 0) {
            return;
        }
        try {
            const currentUser = LocalStorage.getLoginUser();

            const chatMessage = {
                senderName: currentUser.username,
                receiverName: "public",
                messageBody: publicMessage,
                status: "MESSAGE"
            };
            // console.log(chatMessage);
            this.stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
        }
        catch (err) {
            console.log(err);
            toast.error("Error occured when sending message, please try again :(");
            throw new Error(err);
        }
    }

    sendPrivateValue = (privateMessage: string) => {
        if (!privateMessage || privateMessage.length === 0) {
            return;
        }
        try {
            const currentUser = LocalStorage.getLoginUser();

            const chatMessage = {
                senderName: currentUser?.username,
                receiverName: "",
                messageBody: privateMessage,
                status: "MESSAGE"
            };

            // if (userData?.username !== tab) {
            //     privateMessage.get(tab).push(chatMessage);
            //     setPrivateMessage(new Map(privateMessage));
            // }

            this.stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
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
        const messageContent = payloadData?.body?.content;
        console.log("private payload data: ", payloadData);
        console.log(messageContent);
    }


}

export default ChatStore;