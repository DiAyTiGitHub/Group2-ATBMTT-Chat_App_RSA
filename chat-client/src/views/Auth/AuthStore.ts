import axios from "axios";
import { makeAutoObservable } from "mobx";
import LocalStorage from "src/common/LocalStorage";
import { toast } from "react-toastify";
import ConstantList from "src/appConfig";
import { registerUser, authenticateUser } from "./AuthService";
import { UserModel } from "src/models/UserModel";

export default class AuthStore {

    constructor() {
        makeAutoObservable(this);
    }

    authenticateUser = async (user: UserModel) => {
        try {
            const { data } = await authenticateUser(user);
            this.setSession(data?.token);
            toast.success("Login successfully!");
            return data;
        }
        catch (error) {
            if (error?.response?.status === 401)
                toast.error("The username or password is incorrect");
            else {
                toast.error("Connection errors");
            }
            throw new Error(error);
        }
    }

    registerUser = async (user: UserModel) => {
        try {
            const { data } = await registerUser(user);
            toast.success("Register successfully! Please login again!");
            return data;
        }
        catch (error) {
            console.error(error);
            toast.error("Registration isn't success");
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
