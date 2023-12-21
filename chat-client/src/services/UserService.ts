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

export function updateUserPublicKey(publicKey: any) {
    const url = API_PATH + '/publicKey';
    return axios.put(url, publicKey);
}

export function updateUserInfo(userDTO: any) {
    const url = API_PATH + '/info';

    return axios.put(url, userDTO)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating user info:', error);
            throw error;
        });
}

export function uploadUserAvatar(image: any) {
    const url = API_PATH + '/avatar';
    // return axios.post(image);

    const formData = new FormData();
    formData.append("fileUpload", image);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    return axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export function getAvatarURL(avatarUrl:string) {
    return axios.get(avatarUrl, {
        responseType: 'arraybuffer', // Indicate that the response is binary data
    });
}