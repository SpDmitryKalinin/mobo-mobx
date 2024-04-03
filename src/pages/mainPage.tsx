import React, {useEffect, useState} from 'react';
import Picture from '../components/Picture';
import PinLayout from '../components/PinLayout';
import { getStandsRequest, getColorsRequest, getSinksRequest, getMirrorsRequest, getSinksListRequest } from '../api/defaultConfiguration';
import { useFetching } from '../hooks/useFetch';
import StandsStore from '../store/StandsStore';
import sinksStoreClass from '../store/SinksStore';
import mirrorsStoreClass from '../store/MirrorsStore';
import Message from '../components/Message';
import OptionGrid from '../components/OptionGrid';
import ModalWindow from '../components/modalWindow';


const MainPage:React.FC = () => {
    const [fetching, error] = useFetching(async () => {
        await getData()
        .then(res => {
            const {stands, colorsStands, mirrors, sinks} = res;
            StandsStore.setStandsList(stands);
            StandsStore.setStandsColors(colorsStands);
            mirrorsStoreClass.setMirrorsList(mirrors);
            sinksStoreClass.setSinksList(sinks);
            return true;
        })
        .catch(() => {
            console.log('ОШИБКА')
            return false
        })
    })
    const [optionsType, setOptionType] = useState<boolean | string>(false);
    const [optionGrid, setOptionGrid] = useState(false)

    useEffect(() => {
        fetching();
    }, [])

    const getData = async () => {
        try {
            const [standsData, colorsData, mirrorsData, sinksData] = await Promise.all([
                getStandsRequest(),
                getColorsRequest(),
                getMirrorsRequest(),
                getSinksListRequest(),
                
            ])
            return {stands: standsData.data.data, colorsStands: colorsData.data.data, mirrors: mirrorsData.data.data, sinks: sinksData.data.data}
        }
        catch (error) {
            throw error;
        }
    };

    return (
        <section className='main-page'>
            
            <Picture/>
            <PinLayout setOptionType = {setOptionType}/>
            <div className='main-page__right-side'>
                {
                    optionsType === false ? 
                    <Message/>
                    :
                    <OptionGrid optionsType = {optionsType} setOptionType = {setOptionType}/>
                }
            </div>
            <ModalWindow/>
        </section>
    )
}

export default MainPage;