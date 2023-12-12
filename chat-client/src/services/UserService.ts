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

export function getAllFriend() {
    const url = API_PATH + '/friends';
    return axios.get(url);
}

export function searchUsersExcludeSelf(searchObject: any) {
    const url = API_PATH + '/searchExcludeSelf';
    return axios.post(url, searchObject);
}

export function searchUsers(searchObject: any) {
    const url = API_PATH + '/search';
    return axios.post(url, searchObject);
}

export function getAllUsers() {
    const url = API_PATH + '/all';
    return axios.get(url);
}

export function addFriendRequests() {
    const url = API_PATH + '/addFriendRequests';
    return axios.get(url);
}

export function pendingFriendRequests() {
    const url = API_PATH + '/pendingFriendRequests';
    return axios.get(url);
}

export function getAllJoinedRooms() {
    const url = API_PATH + '/joinedRoom';
    return axios.get(url);
}

