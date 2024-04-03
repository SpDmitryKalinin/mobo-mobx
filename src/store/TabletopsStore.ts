import { makeAutoObservable } from "mobx";
import { fetchingData } from "../utils/utils";
import { getTabletopsColorsRequest, getTabletopsRequest } from "../api/defaultConfiguration";
import { tabletopArrayInterface, tabletopColorsInterface } from "../interfaces/api";

class TabletopsStore {
    colorsTabletops: tabletopColorsInterface[] = [];
    allTabletops: tabletopArrayInterface[] = [];
    constructor() {
        makeAutoObservable(this)
    }

    setTabletops(tabletops: tabletopArrayInterface[] = []) {
        this.allTabletops = tabletops;
    }

    getData = async () => {
        try {
            const [tabletops, tabletopsColors] = await Promise.all([await fetchingData(() => getTabletopsRequest()), await fetchingData(() =>getTabletopsColorsRequest())])
            this.allTabletops = tabletops;
            this.colorsTabletops = tabletopsColors;
        }
        catch (error) {
            throw error;
        }
    };    
}

export const tabletopStoreClass = new TabletopsStore();
