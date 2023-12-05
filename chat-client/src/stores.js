import AccountStore from "./components/Account/AccountStore";
import AuthStore from "./components/Auth/AuthStore";
import ChatStore from "./components/Chat/ChatStore";
import FriendsStore from "./components/Friends/FriendsStore";
import ChatV2Store from "./components/ChatV2/ChatV2Store";
import { createContext, useContext } from "react";

const stores = {
    chatStore: new ChatStore(),
    friendsStore: new FriendsStore(),
    accountStore: new AccountStore(),
    authStore: new AuthStore(),
    chatV2Store: new ChatV2Store(),
};

export const StoreContext = createContext(stores);

export function useStore() {
  return useContext(StoreContext);
}
