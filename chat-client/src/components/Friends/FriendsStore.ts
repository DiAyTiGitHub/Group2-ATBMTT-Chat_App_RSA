import { makeAutoObservable } from 'mobx';

class FriendsStore {
    constructors() {
        makeAutoObservable(this);
    }
}

export default FriendsStore;