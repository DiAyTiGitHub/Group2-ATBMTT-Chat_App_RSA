import axios from "axios";
import ConstantList from "src/appConfig";
import { UserModel } from "src/models/UserModel";

const API_PATH = ConstantList.API_ENPOINT + "/api/user";

export function registerUser(user: UserModel) {
    const url = API_PATH + '/register';
    return axios.post(url, user);
}

export function authenticateUser(user: UserModel) {
    const url = API_PATH + '/authenticate';
    return axios.post(url, user);
}