import { makeAutoObservable } from 'mobx';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from "react-toastify";
import LocalStorage from "src/common/LocalStorage";
import { registerUser, authenticateUser } from "../../services/AuthService";
import { getCurrentLoginUser } from "../../services/UserService";
import axios from "axios";

class AuthStore {
    authenticatedUser = null;

    constructor() {
        makeAutoObservable(this);
    }

    authenticateUser = async (user: any) => {
        try {
            const { data } = await authenticateUser(user);
            this.setSession(data?.token);
            // this.connectToSocket();

            toast.success("Login successfully!");
            const { data: userData } = await getCurrentLoginUser();
            this.setUser(userData);
            this.authenticatedUser = userData;
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

    connectToSocket = async () => {
        let Sock = new SockJS('http://localhost:8000/ws');
        console.log("checking sock: ", Sock);
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