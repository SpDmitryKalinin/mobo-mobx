import { allSinksInterface, mirrorArrayItemInterface, mirrorItemInterface, sinkItemInterface, standArrayInterface, standItemInterface, standsListsInterface, tabletopArrayInterface } from "../interfaces/api";
import { mirrorInterface, standInterface, tabletopItemInterface } from "../interfaces/config";
import appStoreClass from "../store/AppStore"
import axios, {AxiosResponse} from "axios";
import ConfigStore from "../store/ConfigStore";
import StandsStore from "../store/StandsStore";


function generateUniqueKey() {
    return Math.random().toString(36).substr(2, 9);
}

const fetchingData = (callBack: () => Promise<AxiosResponse<any, any>>) => {
    appStoreClass.showPreloader();
    return callBack()
        .then((response) => {
            const data = response.data;
            return data.data; // Убедитесь, что data.data соответствует типу AxiosResponse
        })
        .catch((error) => {
            return Promise.reject(error); // Изменено для сохранения типа Promise
        })
        .finally(() => {
            appStoreClass.hidePreloader();
        });
}

function searchStand(standConfig: standInterface, standArray: standArrayInterface[] | []):standItemInterface | boolean {
    const filterStands = standArray.filter((stand: any) => {
        return stand.code === standConfig.article;
    })

    const filterItem = filterStands.length > 0 ? {
        ...filterStands[0],
        material: standConfig.material,
        price: filterStands[0].material[standConfig.material].price,
    } : false;
    return filterItem 
}

function searchMirror(mirrorConfig: mirrorInterface, mirrorArray: mirrorArrayItemInterface[]):mirrorItemInterface | boolean {
    const filterMirror = mirrorArray.filter(mirror => {
        return mirror.code === mirrorConfig.article;
    })
    const material = mirrorConfig.material === null || mirrorConfig.material === false ? false : mirrorConfig.material 
    const filterItem = filterMirror.length > 0 ? {
        ...filterMirror[0],
        material: material,
        price: typeof material !== 'boolean' ? filterMirror[0].material[material].price : filterMirror[0].price | filterMirror[0].defaultPrice,
    } : false;
    return filterItem;
}

function searchSinks(article: string, sinks: allSinksInterface[]):sinkItemInterface | boolean {
    const filterSinks = sinks.find(sink => {
        return sink.mm100.code === article || sink.mm12.code === article;
    }) || false;
    if (typeof filterSinks === 'boolean') {
        return false;
    }
    const sink: sinkItemInterface = {
        ...filterSinks,
        type: filterSinks.mm12.code === article ? 12 : 100,
        price: filterSinks.mm12.code === article ? filterSinks.mm12.price : filterSinks.mm100.price,
    }
    return sink;
}

function searchTabletop(article: string, tabletops: tabletopArrayInterface[], color: string | boolean, position: string) : tabletopItemInterface {
    let depth: number = 0;
    let price: number = 0;
    let material: string = '';
    let width: number = 0;
    const tabletop = tabletops.filter(tabletop => {
        let isSolidThin = tabletop.solid_surface_thin.codes.find(code => {
            if(code.code === article) {
                depth = Number(code.depth);
                price = Number(tabletop.solid_surface_thin.price);
                width = tabletop.width;
                material = 'solid_surface_thin';
            }
            return code.code === article;
        })

        let isSolidWide = tabletop.solid_surface_wide.codes.find(code => {
            if(code.code === article) {
                depth = Number(code.depth);
                price = Number(tabletop.solid_surface_wide.price);
                width = tabletop.width;
                material = 'solid_surface_wide';
            }
            return code.code === article;
        })

        let isKgTypeA = tabletop.kg_type_A.codes.find(code => {
            if(code.code === article) {
                depth = Number(code.depth);
                price = Number(tabletop.kg_type_A.price);
                width = tabletop.width;
                material = 'kg_type_A';
            }
            return code.code === article;
        })

        let isKgTypeB = tabletop.kg_type_B.codes.find(code => {
            if(code.code === article) {
                depth = Number(code.depth);
                price = Number(tabletop.kg_type_B.price);
                width = tabletop.width;
                material = 'kg_type_B';
            }
            return code.code === article;
        })

        return isSolidThin || isSolidWide || isKgTypeA || isKgTypeB;
    })

    const tabletopItem = {
        color: color === "" ? false : color,
        width: width,
        depth: depth,
        article: article,
        price: price,
        type: material,
        position: position,
        name: material === 'solid_surface_wide' || material === 'solid_surface_thin' ? 'Solid Surface' : 'Керамогранит'
    }

    return tabletopItem;
}

export {generateUniqueKey, fetchingData, searchStand, searchSinks, searchMirror, searchTabletop}