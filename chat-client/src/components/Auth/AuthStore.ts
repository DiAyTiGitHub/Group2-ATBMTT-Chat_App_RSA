import { makeAutoObservable } from 'mobx';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from "react-toastify";
import LocalStorage from "src/common/LocalStorage";
import { registerUser, authenticateUser } from "../../services/AuthService";
import { getCurrentLoginUser, updateUserPublicKey } from "../../services/UserService";
import axios from "axios";
import RSAService from './RSAService';

class AuthStore {
    currentLoginUser = null;
    publicKey = null;
    privateKey = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentLoginUser = (currentLoginUser: any) => {
        this.currentLoginUser = { ...currentLoginUser };
    }

    authenticateUser = async (user: any) => {
        try {
            const { data } = await authenticateUser(user);
            this.setSession(data?.token);
            toast.dismiss();
            toast.success("Login successfully!");
            toast.info("Generating keys for upcoming conversations, please wait...");
            const { data: userData } = await getCurrentLoginUser();
            this.setUser(userData);
            this.currentLoginUser = userData;

            //generate key after successfully authenticated
            const rsaKeyGenerator = new RSAService();
            this.publicKey = rsaKeyGenerator.publicKey;
            const { data: publicKeyData } = await updateUserPublicKey(this.publicKey);
            console.log("checking public key data: ", publicKeyData);
            this.privateKey = rsaKeyGenerator.privateKey;
            this.connectToSocket();
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

    stompClient = null;

    setStompClient = (sc: any) => {
        this.stompClient = sc;
    }

    disconnectStompClient = () => {
        if (this.stompClient)
            this.stompClient.disconnect();
    }

    connectToSocket = async () => {
        let Sock = new SockJS('http://localhost:8000/ws');
        this.stompClient = over(Sock);
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        this.stompClient.subscribe('/user/' + this.currentLoginUser.id + '/notification', this.onReceivedNotification);
        // this.stompClient.subscribe('/user/' + this.currentLoginUser.id + '/privateMessage', this.onReceivedNotificationPrivateMessage);
    }

    onReceivedNotificationPrivateMessage = (payload: any) => {
        const payloadData = JSON.parse(payload.body);
        const senderName = payloadData?.user?.username;
        const currentPage = window.location.pathname;
        if (currentPage === "/chat") return;
        toast.info(senderName + " sended you a message!");
    }

    onReceivedPublicMessage = (payload: any) => {
        const currentUser = LocalStorage.getLoginUser();
        const payloadData = JSON.parse(payload.body);
        const messageContent = payloadData?.body?.content;
        if (messageContent == currentUser?.username + " is online!") {
            toast.info("You are online!");
        }
        else {
            toast.info(messageContent);
        }
    }

    onError = (err: any) => {
        console.error(err);
        toast.error("Connect to chat server error, please login again!");
    }

    onReceivedNotification = (payload: any) => {
        const payloadData = JSON.parse(payload.body);
        toast.info(payloadData?.content);
    }

    createNotificationForUserByUserId = (message: any) => {
        try {
            if (!message) {
                throw new Error("Message is empty!");
            }
            this.stompClient.send("/app/notification", {}, JSON.stringify(message));
        }
        catch (err) {
            console.error(err);
            toast.error("Create notification for this user error :(");
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

    //set token
    setLoginToken = (data: any) => LocalStorage.setItem("auth_token", data);
    setUser = (user: any) => LocalStorage.setItem("auth_user", user);
    removeUser = () => LocalStorage.removeItem("auth_user");
}

export default AuthStore;