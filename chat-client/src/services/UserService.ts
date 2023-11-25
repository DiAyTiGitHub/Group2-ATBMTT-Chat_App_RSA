import axios from "axios";
import ConstantList from "src/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/user";

export function getCurrentLoginUser() {
    const url = API_PATH + '/currentLoginUser';
    return axios.get(url);
}

export function getUserById(userId: string) {
    const url = API_PATH + '/' + userId;
    return axios.get(url);
}

export function getAllFriend(){
    const url = API_PATH + '/friends';
    return axios.get(url);
}