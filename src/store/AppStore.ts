import { observable, action, makeObservable } from 'mobx';

class AppStore {
    preloaderStatus = true;
    constructor() {
        makeObservable(this, {
            preloaderStatus: observable,
            showPreloader: action,
            hidePreloader: action,
        })
    }

    showPreloader() {
        this.preloaderStatus = true;
    }

    hidePreloader() {
        this.preloaderStatus = false;
    }
}

const appStoreClass = new AppStore();

export default appStoreClass