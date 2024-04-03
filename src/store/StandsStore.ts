import { observable, action, makeObservable, makeAutoObservable, reaction} from 'mobx';
import { standsListsInterface, standsColorsInterface, standArrayInterface} from '../interfaces/api';
import configStoreClass from './ConfigStore';
import { searchStand } from '../utils/utils';
import cabinetStoreClass from './CabinetStore';
import { getStandList } from '../utils/getLists';

class standsStore {
    standsList: standsListsInterface[] = [];
    standsColors: standsColorsInterface = {};
    standArray: standArrayInterface[] = [];
    constructor() {
        makeAutoObservable(this)
    }
    setStandsList(list: standsListsInterface[] | []) {
        let cabinetsList = list.filter((listItem) => {return listItem.name.toLocaleLowerCase().includes('пенал')});
        let standsList = list.filter((listItem) => {return !listItem.name.toLocaleLowerCase().includes('пенал')});
        cabinetStoreClass.setCabinetsList(cabinetsList);
        this.standsList = standsList;
    }

    setStandArray(standArray: standArrayInterface[]) {
        
        this.standArray = standArray;
        console.log(this.standArray)
    }

    async updateStandArray(id: string) {
        let list;
        await getStandList(id).then(res => {
            list = res;
            standsStoreClass.setStandArray(list)
        })
        .catch(err => {
            console.log(err)
        })
    }

    setStandsColors(colors: standsColorsInterface) {
        this.standsColors = colors;
    }
}

const standsStoreClass = new standsStore()

reaction(
    () => standsStoreClass.standArray, (standArray) => {
        if(typeof configStoreClass.standConfig === 'boolean') {
            return
        }

        const filteredStands = searchStand(configStoreClass.standConfig, standsStoreClass.standArray);

        if (filteredStands) {
            configStoreClass.setStand(filteredStands);
        }
    }
)


export default standsStoreClass;