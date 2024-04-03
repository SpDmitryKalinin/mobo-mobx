import {makeAutoObservable} from 'mobx';
import { allSinksInterface, sinksListInterface } from '../interfaces/api';
class SinksStore {
    allSinks: allSinksInterface[] = [];
    sink: allSinksInterface | boolean = false;
    sinksList: sinksListInterface[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    setAllSinks(sinks: allSinksInterface[]) {
        this.allSinks = sinks;
    }

    setSinksList(sinks: sinksListInterface[]) {
        this.sinksList = sinks;
    }
}

const sinksStoreClass = new SinksStore();




export default sinksStoreClass;