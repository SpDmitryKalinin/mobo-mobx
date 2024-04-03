import { mirrorListInterface, sinksListInterface, standsListsInterface } from "../interfaces/api";
import cabinetStoreClass from "../store/CabinetStore";
import configStoreClass from "../store/ConfigStore";
import mirrorsStoreClass from "../store/MirrorsStore";
import modalWindowStoreClass from "../store/ModalWindowStore";
import sinksStoreClass from "../store/SinksStore";
import standsStoreClass from "../store/StandsStore";
import { generateUniqueKey } from "../utils/utils";

interface OptionGridInterface {
    optionsType: string | boolean;
    setOptionType: React.Dispatch<React.SetStateAction<string | boolean>>;
}

const OptionGrid: React.FC<OptionGridInterface> = ({ optionsType, setOptionType }) => {
    let options: standsListsInterface[] | mirrorListInterface[] | sinksListInterface[] = [];
    let title: string = 'тумбу'
    let onClick: (options: standsListsInterface | mirrorListInterface | sinksListInterface) => void = async (options) => {
        if(optionsType === 'stand') {
            await standsStoreClass.updateStandArray(options.fileName);
        }
        modalWindowStoreClass.setIsOpen(true);
        modalWindowStoreClass.setOptions(options);
    }
    switch (optionsType) {
        case 'stand':
            options = standsStoreClass.standsList;
            title = `Выберите тумбу и редактируйте её`;
            break;
        case 'mirror':
            options = mirrorsStoreClass.mirrorsList;
            title = `Выберите зеркало и редактируйте его`;
            break;
        case 'sink':
            options = sinksStoreClass.sinksList;
            title = `Выберите раковину и редактируйте её`;
            break;
        case 'cabinet':
            options = cabinetStoreClass.cabinetsList;
            title = `Выберите пенал и редактируйте его`;
            break;
        case 'sinkOrTabletop':
            title = `Выберите раковину или столешницу и редактируйте её`
            break;
        default:
    }



    return (
        <section className="option-grid">
            <button className='option-grid__close' onClick={() => setOptionType(false)}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L18 18M18 18L35 35M18 18L35 1M18 18L1 35" stroke="black" strokeWidth="2" />
                </svg>
            </button>
            <h2 className="option-grid__title">{title}</h2>
            {
                optionsType === 'sinkOrTabletop' ?
                <>
                    <div className="option-grid__choice">
                        <button className="button" onClick={() => setOptionType('sink')}>Раковина</button>
                        <button className="button">Столешница</button>
                    </div>
                </>
                :
                <div className="option-grid__options">
                    {
                        options.map((option) => {
                            return (
                                <div className="option-grid__option" key={generateUniqueKey()} onClick = {() => onClick(option)}>
                                    <button className="button button--icon option-grid__button">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.75 17.5C22.75 17.91 22.41 18.25 22 18.25H15V18.5C15 20 14.1 20.5 13 20.5H7C5.9 20.5 5 20 5 18.5V18.25H2C1.59 18.25 1.25 17.91 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75H5V16.5C5 15 5.9 14.5 7 14.5H13C14.1 14.5 15 15 15 16.5V16.75H22C22.41 16.75 22.75 17.09 22.75 17.5Z" fill="#F9F9F9"></path><path d="M22.75 6.5C22.75 6.91 22.41 7.25 22 7.25H19V7.5C19 9 18.1 9.5 17 9.5H11C9.9 9.5 9 9 9 7.5V7.25H2C1.59 7.25 1.25 6.91 1.25 6.5C1.25 6.09 1.59 5.75 2 5.75H9V5.5C9 4 9.9 3.5 11 3.5H17C18.1 3.5 19 4 19 5.5V5.75H22C22.41 5.75 22.75 6.09 22.75 6.5Z" fill="#F9F9F9"></path></svg>
                                    </button>
                                    <div className="option-grid__img">
                                        <img alt={option.name} src={option.img[0]} />
                                    </div>
                                    <div className="option-grid__option-description">
                                        <span className="option-grid__option-title">{option.name}</span>
                                        <span className="option-grid__option-price">от {Math.round(option.price)} Р</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </section>
    )
}

export default OptionGrid;