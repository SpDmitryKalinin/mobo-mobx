import { allSinksInterface } from "./api";

export interface mirrorInterface {
    article: string,
    id: string,
    material: string | boolean | null,
    color: string,
    testmeta: string | boolean,
}

export interface sinkInterface {
    article: string,
    flap: string | boolean,
    position: string,
}

export interface standInterface {
    article: string,
    id: string,
    material: string,
    color: string,
    position: string | boolean,
    secondMaterial: string | boolean,
    secondColor: string | boolean,
}

export interface cabinetInterface {
    article: string,
    id: string,
    material: string,
    color: string,
    position: string | boolean,
    secondMaterial: string | boolean,
    secondColor: string | boolean,
}

export interface tabletopInterface {
    article: string,
    color: string | boolean,
    position: string,
}

export interface fullConfigInterface {
    stand: standInterface | boolean, 
    sink: sinkInterface | boolean, 
    mirror: mirrorInterface | boolean, 
    tabletop: tabletopInterface | boolean,
    cabinet: cabinetInterface | boolean,
}

export interface tabletopItemInterface {
    color: string | boolean;
    article: string;
    type: string;
    price: number;
    depth: number;
    width: number;
    position: string;
    name: string;
}


