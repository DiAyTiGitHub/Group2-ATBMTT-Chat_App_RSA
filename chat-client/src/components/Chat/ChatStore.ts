import { makeAutoObservable } from 'mobx';

class ChatStore {
    privateChats = new Map();
    publicChats = [];
    tab = "ChatIndex";

    constructor() {
        makeAutoObservable(this);
    }

    setTab = (tab: any) => {
        this.tab = tab;
    }

    setPrivateChats = (chats: any) => {
        this.privateChats = chats;
    }

    setPublicChats = (chats: any) => {
        this.publicChats = chats;
    }
}

export default ChatStore;