import { makeAutoObservable } from 'mobx';

class AccountStore {
    constructors() {
        makeAutoObservable(this);
    }
}

export default AccountStore;