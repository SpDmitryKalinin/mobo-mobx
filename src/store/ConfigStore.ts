import { observable, action, makeAutoObservable, reaction } from 'mobx';
import { standInterface, sinkInterface, mirrorInterface, tabletopInterface, cabinetInterface,fullConfigInterface, tabletopItemInterface} from './../interfaces/config';
import {getMirrorsList, getStandList} from '../utils/getLists';
import standsStoreClass from './StandsStore';
import { fetchingData, searchMirror, searchSinks, searchStand, searchTabletop } from '../utils/utils';
import { allSinksInterface, mirrorArrayItemInterface, mirrorItemInterface, sinkItemInterface, standArrayInterface, standItemInterface } from '../interfaces/api';
import PictureStore from './PictureStore';
import sinksStoreClass from './SinksStore';
import { getSinksRequest } from '../api/defaultConfiguration';
import mirrorsStoreClass from './MirrorsStore';
import { tabletopStoreClass } from './TabletopsStore';

class ConfigStore {
    standConfig: standInterface | boolean = false;
    sinkConfig: sinkInterface | boolean = false;
    tabletopConfig: tabletopInterface | boolean = false;
    mirrorConfig: mirrorInterface | boolean = false;
    cabinetConfig: cabinetInterface | boolean = false;
    standConfigId: string | boolean = false;
    mirrorConfigId: string | boolean = false;
    stand: standItemInterface | boolean = false;
    tabletop: tabletopItemInterface | boolean = false;
    sink: sinkItemInterface | boolean = false;
    mirror: mirrorItemInterface | boolean = false;
    cabinet: boolean = false;
    
    constructor() {
        makeAutoObservable(this)
    }
    setStandConfig(standConfig: standInterface | boolean) {
        this.standConfig = standConfig;
        if(typeof standConfig !== 'boolean') {
            this.setStandConfigId(standConfig.id);
        }
    }
    setSinkConfig(sinkConfig: sinkInterface | boolean) {
        this.sinkConfig = sinkConfig;
    }
    setTabletopConfig(tabletopConfig: tabletopInterface | boolean) {
        this.tabletopConfig = tabletopConfig;
    }
    setMirrorConfig(mirrorConfig: mirrorInterface | boolean) {
        this.mirrorConfig = mirrorConfig;
        if(typeof mirrorConfig !== 'boolean') {
            this.setMirrorConfigId(mirrorConfig.id);
        }
    }
    setCabinetConfig(cabinetConfig: cabinetInterface | boolean) {
        this.cabinetConfig = cabinetConfig;
    }

    setStand(stand: standItemInterface | boolean) {
        this.stand = stand;
    }

    setSink(sink: sinkItemInterface | boolean) {
        this.sink = sink;
    }

    setMirror(mirror: mirrorItemInterface | boolean) {
        this.mirror = mirror;
    }

    setTabletop(tabletop: tabletopItemInterface | boolean) {
        this.tabletop = tabletop;
    }

    setStandConfigId(id: string) {
        if(id !== this.standConfigId) {
            this.standConfigId = id;
        }
    }

    setMirrorConfigId(id: string) {
        if(id !== this.mirrorConfigId) {
            this.mirrorConfigId = id;
        }
    }

    

    setFullConfig(fullConfig: fullConfigInterface) {
        this.setStandConfig(fullConfig.stand);
        this.setSinkConfig(fullConfig.sink);
        this.setTabletopConfig(fullConfig.tabletop);
        this.setMirrorConfig(fullConfig.mirror);
        this.setCabinetConfig(fullConfig.cabinet);
    }
    getFullConfig() {
        return {
            stand: this.standConfig,
            sink: this.sinkConfig,
            tabletop: this.tabletopConfig,
            mirror: this.mirrorConfig,
            cabinet: this.cabinetConfig,
        }
    }
    
}

const configStoreClass = new ConfigStore();

reaction(
    () => configStoreClass.standConfigId, 
    async (standConfigId, reaction) => {
        if(typeof configStoreClass.standConfigId === 'boolean') {
            return
        }
        const id = configStoreClass.standConfigId;
        standsStoreClass.updateStandArray(id);
    }
)

reaction(
    () => configStoreClass.standConfig, 
    (standConfig) => {
        if(typeof configStoreClass.standConfig === 'boolean') {
            return
        }

        const filteredStands = searchStand(configStoreClass.standConfig, standsStoreClass.standArray);
        
        if (filteredStands) {
            configStoreClass.setStand(filteredStands);
        }
    }
)

reaction(
    () => configStoreClass.mirrorConfigId,
    (mirrorConfig) => {
        if(typeof configStoreClass.mirrorConfig === 'boolean') {
            return
        }
        const id = configStoreClass.mirrorConfigId;
        let list;
        if(typeof id !== 'boolean') {
            getMirrorsList(id).then(res => {
                list = res;
                mirrorsStoreClass.setMirrorsArray(list);
            })
            .catch(err => {
                console.log(err);
            })
        }
        
    }
)

reaction(
    () => configStoreClass.mirrorConfig, 
    (mirrorConfig) => {
        if(typeof configStoreClass.mirrorConfig === 'boolean') {
            return
        }
        
        const filteredMirror = searchMirror(configStoreClass.mirrorConfig, mirrorsStoreClass.mirrorsArray);
        if (filteredMirror) {
            configStoreClass.setMirror(filteredMirror);
        }
    }
)

reaction(
    () => configStoreClass.stand, (stand) => {
        if(typeof stand !== 'boolean') {
            PictureStore.setPostObjectImg(configStoreClass.getFullConfig(), configStoreClass.sink, configStoreClass.mirror, configStoreClass.tabletop);
        }
    }
)

reaction(
    async () => configStoreClass.sinkConfig, async (sinkConfig) => {
        if(typeof configStoreClass.sinkConfig === 'boolean') {
            return
        }

        if(sinksStoreClass.allSinks.length === 0) {
            const sinks = await fetchingData(() => getSinksRequest()).then(res => {
                return res;
            })
            .catch(error => {
                return error.message
            })
            sinksStoreClass.setAllSinks(sinks);
        }
        
        configStoreClass.setSink(searchSinks(configStoreClass.sinkConfig.article, sinksStoreClass.allSinks))
    }
)

reaction(
    async () => configStoreClass.tabletopConfig, async (tabletopConfig) => {
        if(typeof configStoreClass.tabletopConfig === 'boolean') {
            return
        }
        if(tabletopStoreClass.allTabletops.length === 0) {
            await tabletopStoreClass.getData();
        }
        const tabletop = searchTabletop(configStoreClass.tabletopConfig.article, tabletopStoreClass.allTabletops, configStoreClass.tabletopConfig.color, configStoreClass.tabletopConfig.position);
        configStoreClass.setTabletop(tabletop)
    }
)

reaction(
    () => configStoreClass.sink, (sink) => {
        if(typeof sink !== 'boolean') {
            PictureStore.setPostObjectImg(configStoreClass.getFullConfig(), configStoreClass.sink, configStoreClass.mirror, configStoreClass.tabletop);
        }
    }
)

reaction(
    () => configStoreClass.tabletop, (tabletop) => {
        if(typeof tabletop !== 'boolean') {
            PictureStore.setPostObjectImg(configStoreClass.getFullConfig(), configStoreClass.sink, configStoreClass.mirror, configStoreClass.tabletop);
        }
    }
)


reaction(
    () => configStoreClass.mirror, (mirror) => {
        if(typeof mirror !== 'boolean') {
            PictureStore.setPostObjectImg(configStoreClass.getFullConfig(), configStoreClass.sink, configStoreClass.mirror, configStoreClass.tabletop);
        }
    }
)




export default configStoreClass