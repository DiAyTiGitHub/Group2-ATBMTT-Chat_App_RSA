import { makeAutoObservable } from "mobx";

import { toast } from "react-toastify";

export default class CountryStore {
    
    constructor() {
        makeAutoObservable(this);
      }
}
