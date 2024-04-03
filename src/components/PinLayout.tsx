import React from 'react';
import configStoreClass from '../store/ConfigStore';
import { observer } from 'mobx-react';

interface PinLayoutPropsInterface {
    setOptionType: React.Dispatch<React.SetStateAction<string | boolean>>;
}

interface PinInterface {
    className: string;
    title: string;
    name: string | boolean;
    price: number | boolean;
    setType: () => void;
}


const PinLayout: React.FC<PinLayoutPropsInterface> = ({setOptionType}) => {
    const pins: PinInterface[] = [
        {
            className: 'pin-layout__control--mirror',
            title: 'Зеркало',
            name: typeof configStoreClass.mirror !== 'boolean' ? configStoreClass.mirror.name : 'Не выбрано',
            price: typeof configStoreClass.mirror !== 'boolean' ? configStoreClass.mirror.price : false,
            setType: () => setOptionType('mirror') 
        },
        {
            className: 'pin-layout__control--cabinet',
            title: 'Пенал',
            name: false,
            price: false,
            setType: () => setOptionType('cabinet') 
        },
        {
            className: 'pin-layout__control--sink',
            title: typeof configStoreClass.sink !== 'boolean' ? 'Раковина' : typeof configStoreClass.tabletop !== 'boolean' ? 'Столешница' : 'Раковина или столешница',
            name: typeof configStoreClass.sink !== 'boolean' ? configStoreClass.sink.name : typeof configStoreClass.tabletop !== 'boolean' ? configStoreClass.tabletop.name : 'Не выбрано',
            price: typeof configStoreClass.sink !== 'boolean' ? configStoreClass.sink.price : typeof configStoreClass.tabletop !== 'boolean' ? configStoreClass.tabletop.price : false,
            setType: () => setOptionType('sinkOrTabletop') 
        },
        {
            className: 'pin-layout__control--stand',
            title: 'Тумба',
            name: typeof configStoreClass.stand !== 'boolean' ? configStoreClass.stand.name : 'Не выбрано',
            price: typeof configStoreClass.stand !== 'boolean' ? configStoreClass.stand.price : false,
            setType: () => setOptionType('stand') 
        }
    ]
    return (
        <div className='pin-layout'>
            {
                pins.map((pin: PinInterface) => {
                    const {className, title, name, price, setType} = pin
                    return (
                        <div className={`pin-layout__control ${className}`}>
                            <button className='pin-layout__button button button--pin' onClick={() => setType()}></button>
                            <div className='pin-layout__promt'>
                                <span className='pin-layout__desc'>{title}</span>
                                <span className='pin-layout__name'>{name}</span>
                                <span className='pin-layout__price'>{price} Р</span>
                            </div>
                            <button className='pin-layout__cross'>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.8" d="M1 1L5 5M5 5L9 9M5 5L9 1M5 5L1 9" stroke="#EDEDED" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    )
                })
            }
        </div>
        
    )
}

export default observer(PinLayout);