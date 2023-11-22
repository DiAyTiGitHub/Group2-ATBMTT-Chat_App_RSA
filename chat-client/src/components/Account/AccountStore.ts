import { makeAutoObservable } from 'mobx';

class AccountStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export default AccountStore;