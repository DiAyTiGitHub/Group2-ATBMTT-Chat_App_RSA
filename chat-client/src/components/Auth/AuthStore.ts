import { makeAutoObservable } from 'mobx';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from "react-toastify";
import LocalStorage from "src/common/LocalStorage";
import { registerUser, authenticateUser } from "../../services/AuthService";
import axios from "axios";

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

    constructor() {
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
        this.setUserData({ ...this.userData, connected: true });
        this.stompClient.subscribe('/chatroom/public', this.onMessageReceived);
        this.stompClient.subscribe('/user/' + this.userData?.username + '/private', this.onPrivateMessage);
        this.userJoin();
        toast.success("Tạo tài khoản thành công, quay lại tab Chat!");
        console.dir("checking userData: " + this.userData);

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

    authenticateUser = async (user: any) => {
        try {
            const { data } = await authenticateUser(user);
            this.setSession(data?.token);
            toast.success("Login successfully!");
            return data;
        }
        catch (error) {
            if (error?.response?.status === 401)
                toast.error("The username or password is incorrect!");
            else {
                toast.error("Connection errors!");
            }
            throw new Error(error);
        }
    }

    signUpUser = async (user: any) => {
        try {
            const { data } = await registerUser(user);
            toast.success("Register successfully! Please login again!");
            return data;
        }
        catch (error) {
            if (error?.response?.status === 409)
                toast.info("The username has existed, please choose another one!");
            else {
                console.error(error);
                toast.error("Registration has error occured :(");
            }
            throw new Error(error);
        }
    }

    logout = () => {
        this.setSession(null);
        this.removeUser();
    };

    setSession(token: any) {
        if (token) {
            LocalStorage.setItem("jwt_token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            LocalStorage.removeItem("jwt_token");
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    setLoginUser = (data: any) => {
        let user: any = {};
        user.token = data.access_token;
        this.setUser(user);
        return user;
    };

    //set token
    setLoginToken = (data: any) => LocalStorage.setItem("auth_token", data);
    setUser = (user: any) => LocalStorage.setItem("auth_user", user);
    removeUser = () => localStorage.removeItem("auth_user");
}

export default AuthStore;