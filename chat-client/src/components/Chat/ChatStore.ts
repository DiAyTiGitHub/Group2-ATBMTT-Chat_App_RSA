import { makeAutoObservable } from 'mobx';
import { toast } from "react-toastify";

class ChatStore {
    privateMessage = "";
    publicMessage = "";
    tab = "ChatIndex";

    constructor() {
        makeAutoObservable(this);
    }

    setTab = (tab: any) => {
        this.tab = tab;
    }

    setPrivateMessage = (chats: any) => {
        this.privateMessage = chats;
    }

    setPublicMessage = (chats: any) => {
        this.publicMessage = chats;
    }

    sendValue = (authStore: any) => {
        const { stompClient, userData } = authStore;

        if (stompClient) {
            const chatMessage = {
                senderName: userData?.username,
                receiverName: "public",
                messageBody: this.publicMessage,
                status: "MESSAGE"
            };
            // console.log(chatMessage);
            stompClient.send("/app/public-message", {}, JSON.stringify(chatMessage));
            this.setPublicMessage("");
        }
        else {
            toast.error("Bạn phải đăng nhập trước!");
        }
    }

    sendPrivateValue = (authStore: any) => {
        const { stompClient, userData } = authStore;

        if (stompClient) {
            var chatMessage = {
                senderName: userData?.username,
                receiverName: "",
                messageBody: userData.messageBody,
                status: "MESSAGE"
            };

            // if (userData?.username !== tab) {
            //     privateMessage.get(tab).push(chatMessage);
            //     setPrivateMessage(new Map(privateMessage));
            // }

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            this.setPrivateMessage("");
        }
        else {
            toast.error("Bạn phải đăng nhập trước!");
        }
    }
}

export default ChatStore;