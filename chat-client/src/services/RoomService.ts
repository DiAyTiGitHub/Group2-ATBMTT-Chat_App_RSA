import axios from "axios";
import ConstantList from "src/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/room";

export function searchJoinedRooms(searchObject: any) {
    const url = API_PATH + '/search';
    return axios.post(url, searchObject);
}

export function createGroupChat(room: any) {
    const url = API_PATH + '/group';
    return axios.post(url, room);
}

export function updateGroupChat(room: any) {
    const url = API_PATH;
    return axios.put(url, room);
}

export function getListFriendNotInRoom(roomId: string) {
    const url = API_PATH + "/group/not-in/" + roomId;
    return axios.get(url);
}

export function addUserIntoGroupChat(userId: string, roomId: string) {
    const url = API_PATH + "/group/" + userId + "/" + roomId;
    return axios.post(url);
}

export function unjoinAnGroupChat(roomId: string) {
    const url = API_PATH + "/group/" + roomId;
    return axios.delete(url);
}

export function uploadRoomAvatar(image: any, roomId:string) {
    const url = API_PATH + '/avatar/' + roomId;

    const formData = new FormData();
    formData.append("fileUpload", image);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    return axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}