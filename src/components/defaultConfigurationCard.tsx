import React from 'react';

import сonfigStoreClass from '../store/ConfigStore';
import { fullConfigInterface } from '../interfaces/config';
import { useNavigate } from "react-router-dom";

interface defaultConfigurationCardProps {
    img: string;
    config: fullConfigInterface
}

const DefaultConfigurationCard:React.FC<defaultConfigurationCardProps> = ({img, config}) => {
    let navigate = useNavigate();
    const setConfiguration = (config: fullConfigInterface) => {
        сonfigStoreClass.setFullConfig(config)
        navigate("/main")
    }
    
    return (
        <button onClick={() => setConfiguration(config)} className='default-configuration-card'>
            <img alt="example" src={img}/>
        </button>
    )
}

export default DefaultConfigurationCard;