import axios from "axios";
import{
    addressStandList, 
    addressStands, 
    addressColorsStand, 
    addressSinks, 
    addressTabletops, 
    addressTabletopsColor, 
    addressFlapVariation, 
    addressFlaps, 
    addressDefaultConfig, 
    addressMirrors, 
    addressMirrorsList, 
    addressCabinets, 
    addressCabinetList, 
    addressSinksId, 
    addressRender
} from "../utils/addresses";
import { pictureInterface } from "../interfaces/api";

//first screen
const defaultConfigurationRequest = () => axios.get(addressDefaultConfig);

//Lists for render second screen
const getColorsRequest = () => axios.get(addressColorsStand);
const getSinksRequest = () => axios.get(addressSinks)
const getTabletopsRequest = () => axios.get(addressTabletops);
const getTabletopsColorsRequest = () => axios.get(addressTabletopsColor);
const getMirrorsRequest = () => axios.get(addressMirrors);
const getCabinestRequest = () => axios.get(addressCabinets);

const getStandsRequest = () => axios.get(addressStands);

//get only list

const getStandListRequest = (standId: string) => axios.get(addressStandList + standId);
const getMirrorsListRequest = (mirrorId: string) => axios.get(addressMirrorsList + mirrorId);
const getSinksListRequest = () => axios.get(addressSinksId);
const getCabinestListRequest = () => axios.get(addressCabinetList);

//get only for sinks
const getFlapsVariablesRequest = () => axios.get(addressFlapVariation);
const getFlapsRequest = () => axios.get(addressFlaps);

//post requests for renders
const postPictureRequest = (postObjectImg: pictureInterface) => axios.post(addressRender, postObjectImg);


export {defaultConfigurationRequest,getStandsRequest, getColorsRequest, getStandListRequest, getSinksRequest, getTabletopsRequest, getTabletopsColorsRequest, getMirrorsRequest, getCabinestRequest, getSinksListRequest, getFlapsVariablesRequest, getFlapsRequest, postPictureRequest, getMirrorsListRequest}