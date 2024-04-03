export interface standsListsInterface {
    name: string;
    fileName: string;
    img: string[];
    price: number;
    description: string;
    is_bicolor: boolean;
    is_standwithtype: boolean;
}

export interface standsColorsInterface {
    [key: string]: {
        name: string;
        img: string;
        colors: {
            color: string;
            name: string;
            img: string;
        }
    }[];
}

interface Material {
    name: string;
    price: number;
}


export interface standArrayInterface {
    collection: string;
    name: string;
    width: number;
    depth: number;
    height: number;
    code: string;
    fileName: string;
    material: Record<string, Material>;
    sinks: string[];
    counterTops: string[];
    position_sink: string[];
}

export interface standItemInterface {
    collection: string;
    name: string;
    width: number;
    depth: number;
    height: number;
    code: string;
    fileName: string;
    sinks: string[];
    counterTops: string[];
    position_sink: string[];
    material: string;
    price: number;
}

export interface pictureInterface {
    bg: string | boolean;
    stand: string | boolean;
    standType: string | boolean;
    standMaterial: string | boolean;
    secondColor: string | boolean;
    cutout: string | boolean;
    sink: string | boolean;
    sinkPosition: string | boolean;
    sinkCountCup: number | boolean;
    sinkHeight: number | boolean;
    tabletop: string | boolean;
    tabletopPosition: string | boolean;
    mirror: string | boolean;
    mirrorMaterial: string | boolean;
    cabinet: string | boolean;
    cabinetMaterial: string | boolean;
    cabinetSecondColor: string | boolean;
}

export interface pictureObjectInterface {
    bg: string | boolean;
    stand: string | boolean;
    standMaterial: string | boolean;
    standSecondColor: string | boolean;
    sink: string | boolean;
    tabletop: string | boolean;
    mirror: string | boolean;
    mirrorMaterial: string | boolean;
    cabinet: string | boolean;
    cabinetMaterial: string | boolean;
    cabinetSecondColor: string | boolean;
}


export interface allSinksInterface {
    name: string;
    countertop_width: number;
    countertop_depth: number;
    cup_width: number;
    cup_depth: number;
    count_cup: number;
    mm12: {
        price: number;
        code: string;
    };
    mm100: {
        price: number;
        code: string;
    };
}

export interface sinkItemInterface {
    name: string;
    countertop_width: number;
    countertop_depth: number;
    cup_width: number;
    cup_depth: number;
    count_cup: number;
    type: number;
    price: number;
}

export interface tabletopArrayInterface {
    name: string;
    width: number;
    solid_surface_thin: {
      price: number;
      codes: { depth: string; code: string }[];
    };
    solid_surface_wide: {
      price: number;
      codes: { depth: string; code: string }[];
    };
    kg_type_A: {
      price: number;
      codes: { depth: string; code: string }[];
    };
    kg_type_B: {
      price: number;
      codes: { depth: string; code: string }[];
    };
}

export interface tabletopColorsInterface {
    solid_surface: {
        name: string,
        type: [
            {
                solid_surface_wide: {
                    name: string,
                    colors: boolean,
                },
                solid_surface_thin: {
                    name: string,
                    colors: boolean,
                }
            }
        ];
    },
    KG: {
        name: string,
        type: [
            {
                kg_type_A: {
                    name: string,
                    colors: {
                        color: string,
                        name: string,
                        img: string
                    }[]
                },
                kg_type_B: {
                    name: string,
                    colors: {
                        color: string,
                        name: string,
                        img: string
                    }[]
                }
            }
        ]
    }
}




export interface mirrorListInterface {
    name: string;
    fileName: string;
    img: string[];
    price: number;
    description: string;
}

export interface sinksListInterface {
    name: string;
    fileName: string;
    img: string[];
    price: number;
    description: string;
}
 
export interface mirrorArrayItemInterface {
    name: string;
    width: number;
    depth: number;
    height: number;
    withMaterial: boolean;
    defaultPrice: number;
    code: string;
    fileName: string;
    material: Record<string, Material>;
    price: number;
}

export interface mirrorItemInterface {
    name: string;
    width: number;
    depth: number;
    height: number;
    withMaterial: boolean;
    defaultPrice: number;
    code: string;
    fileName: string;
    material: string | boolean;
    price: number;
}








