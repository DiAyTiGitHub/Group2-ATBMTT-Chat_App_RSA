class LocalStorage {
    ls = window.localStorage

    removeItem = (key:any) => this.ls.removeItem(key);

    setItem(key:any, value:any) {
        value = JSON.stringify(value);
        this.ls.setItem(key, value);
        return true;
    }

    getItem(key:any) {
        try {
            let value = this.ls.getItem(key);
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    }

    getLoginUser() {
        return this.getItem("auth_user");
    }
}

export default new LocalStorage();