import { makeAutoObservable } from 'mobx';

class AuthStore {
    constructors() {
        makeAutoObservable(this);
    }
}

export default AuthStore;