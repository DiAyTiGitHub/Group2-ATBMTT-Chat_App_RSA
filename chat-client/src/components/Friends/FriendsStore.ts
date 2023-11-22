import { makeAutoObservable } from 'mobx';

class FriendsStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export default FriendsStore;