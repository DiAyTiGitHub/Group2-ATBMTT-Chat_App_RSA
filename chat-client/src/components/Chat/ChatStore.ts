import { makeAutoObservable } from 'mobx';
import { toast } from "react-toastify";

class ChatStore {
    privateMessage = "";
    publicMessage = "";
    tab = "ChatIndex";

    constructor() {
        makeAutoObservable(this);
    }

    setTab = (tab: any) => {
        this.tab = tab;
    }

    setPrivateMessage = (chats: any) => {
        this.privateMessage = chats;
    }

    setPublicMessage = (chats: any) => {
        this.publicMessage = chats;
    }

    sendValue = (authStore: any) => {
        const { stompClient, userData } = authStore;

        if (stompClient) {
            const chatMessage = {
                senderName: userData?.username,
                receiverName: "public",
                messageBody: this.publicMessage,
                status: "MESSAGE"
            };
            // console.log(chatMessage);
            stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
            this.setPublicMessage("");
        }
        else {
            toast.error("Bạn phải đăng nhập trước!");
        }
    }

    sendPrivateValue = (authStore: any) => {
        const { stompClient, userData } = authStore;

        if (stompClient) {
            var chatMessage = {
                senderName: userData?.username,
                receiverName: "",
                messageBody: userData.messageBody,
                status: "MESSAGE"
            };

            // if (userData?.username !== tab) {
            //     privateMessage.get(tab).push(chatMessage);
            //     setPrivateMessage(new Map(privateMessage));
            // }

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            this.setPrivateMessage("");
        }
        else {
            toast.error("Bạn phải đăng nhập trước!");
        }
    }






    stompClient = null;
    
    // registerUser = () => {
    //     this.connect();
    // }

    // connect = () => {
    //     let Sock = new SockJS('http://localhost:8080/ws');
    //     this.stompClient = over(Sock);
    //     this.stompClient.connect({}, this.onConnected, this.onError);
    // }

    // onConnected = () => {
    //     this.setUserData({ ...this.userData, connected: true });
    //     this.stompClient.subscribe('/chatroom/public', this.onMessageReceived);
    //     this.stompClient.subscribe('/user/' + this.userData?.username + '/private', this.onPrivateMessage);
    //     this.userJoin();
    //     toast.success("Tạo tài khoản thành công, quay lại tab Chat!");
    //     console.dir("checking userData: " + this.userData);

    // }

    // userJoin = () => {
    //     var chatMessage = {
    //         senderName: this.userData?.username,
    //         status: "JOIN"
    //     };
    //     this.stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
    // }

    // onMessageReceived = (payload: any) => {
    //     var payloadData = JSON.parse(payload.body);
    //     switch (payloadData.status) {
    //         case "JOIN":
    //             if (!this.privateChats.get(payloadData.senderName)) {
    //                 this.privateChats.set(payloadData.senderName, []);
    //                 this.setPrivateChats(new Map(this.privateChats));
    //             }
    //             break;
    //         case "MESSAGE":
    //             this.publicChats.push(payloadData);
    //             this.setPublicChats([...this.publicChats]);
    //             break;
    //     }
    // }

    // onPrivateMessage = (payload: any) => {
    //     console.log(payload);
    //     var payloadData = JSON.parse(payload.body);
    //     if (this.privateChats.get(payloadData.senderName)) {
    //         this.privateChats.get(payloadData.senderName).push(payloadData);
    //         this.setPrivateChats(new Map(this.privateChats));
    //     } else {
    //         let list = [];
    //         list.push(payloadData);
    //         this.privateChats.set(payloadData.senderName, list);
    //         this.setPrivateChats(new Map(this.privateChats));
    //     }
    // }

    // onError = (err: any) => {
    //     console.log(err);
    //     toast.error("Tạo tài khoản có lỗi, thử lại!");
    // }
}

export default ChatStore;