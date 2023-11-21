import { makeAutoObservable } from 'mobx';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from "react-toastify";

class AuthStore {
    stompClient = null;
    privateChats = new Map();
    publicChats = [];
    userData = {
        username: '',
        receivername: '',
        connected: false,
        messageBody: ''
    }
    tab = "ChatIndex";

    constructors() {
        makeAutoObservable(this);
    }

    setTab = (tab: any) => {
        this.tab = tab;
    }

    setPrivateChats = (chats: any) => {
        this.privateChats = chats;
    }

    setPublicChats = (chats: any) => {
        this.publicChats = chats;
    }

    setUserData = (userData: any) => {
        this.userData = userData;
    }

    registerUser = () => {
        this.connect();
    }

    connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        this.stompClient = over(Sock);
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        this.setUserData({ ...this.userData, "connected": true });
        this.stompClient.subscribe('/ChatIndex/public', this.onMessageReceived);
        this.stompClient.subscribe('/user/' + this.userData?.username + '/private', this.onPrivateMessage);
        this.userJoin();
        toast.success("Tạo tài khoản thành công, quay lại tab Chat!");
    }

    userJoin = () => {
        var chatMessage = {
            senderName: this.userData?.username,
            status: "JOIN"
        };
        this.stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
    }

    onMessageReceived = (payload: any) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!this.privateChats.get(payloadData.senderName)) {
                    this.privateChats.set(payloadData.senderName, []);
                    this.setPrivateChats(new Map(this.privateChats));
                }
                break;
            case "MESSAGE":
                this.publicChats.push(payloadData);
                this.setPublicChats([...this.publicChats]);
                break;
        }
    }

    onPrivateMessage = (payload: any) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (this.privateChats.get(payloadData.senderName)) {
            this.privateChats.get(payloadData.senderName).push(payloadData);
            this.setPrivateChats(new Map(this.privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            this.privateChats.set(payloadData.senderName, list);
            this.setPrivateChats(new Map(this.privateChats));
        }
    }

    onError = (err: any) => {
        console.log(err);
        toast.error("Tạo tài khoản có lỗi, thử lại!");
    }

    sendValue = () => {
        if (this.stompClient) {
            var chatMessage = {
                senderName: this.userData?.username,
                receiverName: "public",
                messageBody: this.userData.messageBody,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            this.stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
            this.setUserData({ ...this.userData, "messageBody": "" });
        }
    }

    sendPrivateValue = () => {
        if (this.stompClient) {
            var chatMessage = {
                senderName: this.userData?.username,
                receiverName: this.tab,
                messageBody: this.userData.messageBody,
                status: "MESSAGE"
            };

            if (this.userData?.username !== this.tab) {
                this.privateChats.get(this.tab).push(chatMessage);
                this.setPrivateChats(new Map(this.privateChats));
            }
            this.stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            this.setUserData({ ...this.userData, "messageBody": "" });
        }
    }
}

export default AuthStore;