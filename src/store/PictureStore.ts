import { observable, action, makeObservable, reaction, makeAutoObservable} from 'mobx';
import { allSinksInterface, mirrorArrayItemInterface, mirrorItemInterface, pictureInterface, pictureObjectInterface, sinkItemInterface } from '../interfaces/api';
import configStoreClass from './ConfigStore';
import { fullConfigInterface, tabletopItemInterface } from '../interfaces/config';
import { fetchingData } from '../utils/utils';
import { postPictureRequest } from '../api/defaultConfiguration';

class PictureStore{
    imgObject : pictureObjectInterface  = {
        bg: false,
        stand: false,
        standMaterial: false,
        standSecondColor: false,
        sink: false,
        tabletop: false,
        mirror: false,
        mirrorMaterial: false,
        cabinet: false,
        cabinetMaterial: false,
        cabinetSecondColor: false
    }

    postObjectImg: pictureInterface = {
        bg: false,
        stand: false,
        standType: false,
        standMaterial: false,
        secondColor: false,
        cutout: false,
        sink: false,
        sinkPosition: false,
        sinkCountCup: false,
        sinkHeight: false,
        tabletop: false,
        tabletopPosition: false,
        mirror: false,
        mirrorMaterial: false,
        cabinet: false,
        cabinetMaterial: false,
        cabinetSecondColor: false
    }
    constructor() {
        makeAutoObservable(this);
    }

    setImgObject(imgObject: pictureObjectInterface) {
        this.imgObject = imgObject;
    }

    setPostObjectImg(fullConfig : fullConfigInterface, sink: sinkItemInterface | boolean, mirror: mirrorItemInterface | boolean, tabletop: tabletopItemInterface | boolean) {
        const tabletopType = typeof tabletop === 'boolean' ? false 
        : tabletop.type === 'solid_surface_thin' ? 'SolidSurface12' 
        : tabletop.type === 'solid_surface_wide' ? 'SolidSurface100' : tabletop.color
        this.postObjectImg = {
            bg: typeof fullConfig.stand !== 'boolean' ? fullConfig.stand.id : false,
            stand: typeof fullConfig.stand !== 'boolean' ? fullConfig.stand.id : false,
            standType: typeof fullConfig.stand !== 'boolean' ? fullConfig.stand.position : false,
            standMaterial: typeof fullConfig.stand !== 'boolean' ? fullConfig.stand.color : false,
            secondColor: typeof fullConfig.stand !== 'boolean' ? fullConfig.stand.secondColor : false,
            cutout: typeof fullConfig.sink !== 'boolean' ? fullConfig.sink.article.indexOf('W.') === -1 ? true : false : false,
            sink: typeof sink !== 'boolean' ? sink.name : false,
            sinkPosition: typeof fullConfig.sink !== 'boolean' ? fullConfig.sink.position : false,
            sinkCountCup: typeof sink !== 'boolean' ? sink.count_cup : false,
            sinkHeight: typeof sink !== 'boolean' ? sink.type : false,
            tabletop: tabletopType,
            tabletopPosition: typeof tabletop !== 'boolean' ? tabletop.position : false,
            mirror: typeof mirror !== 'boolean' ? mirror.name : false, 
            mirrorMaterial: typeof fullConfig.mirror !==`boolean` ? fullConfig.mirror.color : false,
            cabinet: false,
            cabinetMaterial: false,
            cabinetSecondColor: false
        }
    }
}

const pictureStoreClass = new PictureStore();

reaction(
    () => pictureStoreClass.postObjectImg, (postObjectImg) => {
        const response = fetchingData(() => postPictureRequest(postObjectImg)).then(res => {
            pictureStoreClass.setImgObject(res);
        })
    }
)



export default pictureStoreClass;



