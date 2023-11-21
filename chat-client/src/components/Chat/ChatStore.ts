import { makeAutoObservable } from 'mobx';

class ChatStore {
    constructors() {
        makeAutoObservable(this);
    }
}

export default ChatStore;