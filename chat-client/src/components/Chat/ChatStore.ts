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
        this.stompClient.subscribe('/chatroom/public', this.onReceivedPublicMessage);
        // this.stompClient.subscribe('/user/' + this.userData?.username + '/private', this.onReceivedPrivateMessage);
        this.userJoin();
        toast.success("Start enjoy chatting!");
    }

    onError = (err: any) => {
        console.log(err);
        toast.error("Connect to chat server error, please try again!");
    }

    userJoin = () => {
        const currentUser = LocalStorage.getLoginUser();
        const chatMessage = {
            senderName: currentUser?.username,
            status: "JOIN"
        };
        this.stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
    }

    publicMessageStack = [];

    onReceivedPublicMessage = (payload: any) => {
        console.log(payload);
        const payloadData = JSON.parse(payload.body);
        this.publicMessageStack.push(payloadData);
        this.publicMessageStack = [...this.publicMessageStack];
        // switch (payloadData.status) {
        //     case "JOIN":
        //         if (!this.privateChats.get(payloadData.senderName)) {
        //             this.privateChats.set(payloadData.senderName, []);
        //             this.setPrivateChats(new Map(this.privateChats));
        //         }
        //         break;
        //     case "MESSAGE":
        //         this.publicChats.push(payloadData);
        //         this.setPublicChats([...this.publicChats]);
        //         break;
        // }
    }

    onReceivedPrivateMessage = (payload: any) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        // if (this.privateChats.get(payloadData.senderName)) {
        //     this.privateChats.get(payloadData.senderName).push(payloadData);
        //     this.setPrivateChats(new Map(this.privateChats));
        // } else {
        //     let list = [];
        //     list.push(payloadData);
        //     this.privateChats.set(payloadData.senderName, list);
        //     this.setPrivateChats(new Map(this.privateChats));
        // }
    }

    chosenRoom = null;

    setChosenRoom = (chosenRoom: any) => {
        this.chosenRoom = chosenRoom;
    }

    joinedRooms = [];
    getAllJoinedRooms = async () => {
        try {
            const { data } = await getAllJoinedRooms();
            this.joinedRooms = data;
            console.log("joinedRooms data: ", data);
            this.chosenRoom = data[0];
        }
        catch (error) {
            console.log(error);
            toast.error("Load conversation fail, please try again!");
        }
    }


}

export default ChatStore;