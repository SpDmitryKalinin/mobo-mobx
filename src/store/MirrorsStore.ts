import { makeAutoObservable, reaction } from "mobx";
import { mirrorArrayItemInterface, mirrorListInterface } from "../interfaces/api";
import configStoreClass from "./ConfigStore";
import { searchMirror } from "../utils/utils";

class MirrorsStore {
    mirrorsList: mirrorListInterface[] = [];
    mirrorsArray: mirrorArrayItemInterface[] = [];
    constructor() {
        makeAutoObservable(this)
    }

    setMirrorsList(list: mirrorListInterface[] | []) {
        this.mirrorsList = list;
    }

    setMirrorsArray(standArray: mirrorArrayItemInterface[]) {
        this.mirrorsArray = standArray;
    }
}

const mirrorsStoreClass = new MirrorsStore()

reaction(
    () => mirrorsStoreClass.mirrorsArray, (mirrorsArray) => {
        if(typeof configStoreClass.standConfig === 'boolean') {
            return
        }
        if(typeof configStoreClass.mirrorConfig !== 'boolean') {
            const filteredMirror = searchMirror(configStoreClass.mirrorConfig, mirrorsStoreClass.mirrorsArray);
            if (filteredMirror) {
                configStoreClass.setMirror(filteredMirror);
            }
        }

        
    }
)

export default mirrorsStoreClass;