import { makeAutoObservable } from "mobx";

import { toast } from "react-toastify";

export default class EthnicsStore {

    constructor() {
        makeAutoObservable(this);
    }
}
