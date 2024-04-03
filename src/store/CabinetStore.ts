import { makeAutoObservable } from "mobx";
import { standsListsInterface } from "../interfaces/api";

class CabinetStore {
    cabinetsList: standsListsInterface[] = [];
    constructor() {
        makeAutoObservable(this)
    }

    setCabinetsList(cabinetsList: standsListsInterface[]) {
        this.cabinetsList = cabinetsList;
    }
}

const cabinetStoreClass = new CabinetStore();

export default cabinetStoreClass;