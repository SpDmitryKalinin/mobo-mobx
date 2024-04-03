import React from 'react';
import {useEffect, useState} from 'react';
import DefaultConfigurationCard from '../components/defaultConfigurationCard';
import {defaultConfigurationRequest} from '../api/defaultConfiguration';
import { useFetching } from '../hooks/useFetch';
import { generateUniqueKey } from '../utils/utils';


import { standInterface, sinkInterface, mirrorInterface, tabletopInterface } from '../interfaces/config';
import SelectDefault from '../components/select/select';
import SelectPicture from '../components/select/selectPicture';

interface configInterface {
    img: string,
    cabinet: boolean,
    sink: sinkInterface | boolean,
    tabletop: tabletopInterface | boolean,
    stand: standInterface | boolean,
    mirror: mirrorInterface | boolean,
}

const StartPage: React.FC = () => {
    const [defaultConfigurations, setDefaultConfigurations] = useState<configInterface[] | []>([]);
    const [fetching, error] = useFetching(async () => {
        await defaultConfigurationRequest()
        .then(res => {
            setDefaultConfigurations(res.data.data);
        })
        .catch(() => {
            console.log(error)
        })
    })
    
    useEffect(() => {
        fetching();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className='start-page'>
            <h1 className='start-page__title'>Выберите коллекцию, которую вы хотели бы редактировать</h1>
            <p className='start-page__subtitle'>Это вдохновляющие изображения. Товары могут быть изменены в дальнейших шагах.</p>
            <div className='start-page__card-grid'>
                {
                    defaultConfigurations.map((defaultConfig => {
                        return <DefaultConfigurationCard 
                        key={generateUniqueKey()} 
                        config = {
                            {
                                stand: defaultConfig.stand, 
                                sink: defaultConfig.sink,
                                mirror: defaultConfig.mirror,
                                tabletop: defaultConfig.tabletop,
                                cabinet: defaultConfig.cabinet,
                            }  
                        } 
                        img = {defaultConfig.img}/>
                    }))
                }
            </div>
            
        </section>
    )
}

export default StartPage;