import AccountStore from "./components/Account/AccountStore";
import AuthStore from "./components/Auth/AuthStore";
import ChatStore from "./components/Chat/ChatStore";
import FriendsStore from "./components/Friends/FriendsStore";

const stores = {
    chatStore: new ChatStore(),
    friendsStore: new FriendsStore(),
    accountStore: new AccountStore(),
    authStore: new AuthStore(),
};

export const useStore = function () {
    return stores;
}
