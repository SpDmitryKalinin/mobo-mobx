import { makeAutoObservable } from "mobx";
import { standsListsInterface, mirrorListInterface, sinksListInterface } from "../interfaces/api";

class ModalWindowStore {
    type: string | boolean = false;
    isOpen: boolean = false;
    options: standsListsInterface | mirrorListInterface | sinksListInterface | boolean = false;
    constructor() {
        makeAutoObservable(this)
    }
    setOptions(option: standsListsInterface | mirrorListInterface | sinksListInterface | boolean) {
        this.options = option;
    }

    setIsOpen(isOpen: boolean) {
        this.isOpen = isOpen;
    }
}

const modalWindowStoreClass = new ModalWindowStore();

export default modalWindowStoreClass;