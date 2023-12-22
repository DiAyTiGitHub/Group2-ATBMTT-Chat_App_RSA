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
