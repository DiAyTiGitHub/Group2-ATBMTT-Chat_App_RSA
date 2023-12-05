import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/friend";

export const sendFriendRequest = (receiverId) => {
  let url = `${API_PATH}/request/${receiverId}`;
  return axios.post(url);
};

export const acceptFriendRequest = (relationshipId) => {
  let url = `${API_PATH}/accept/${relationshipId}`;
  return axios.put(url);
};

export const unfriendUser = (userId) => {
  let url = `${API_PATH}/${userId}`;
  return axios.delete(url);
};

export const getRelationshipByFriendId = (friendId) => {
  let url = `${API_PATH}/relationship/${friendId}`;
  return axios.get(url);
};
