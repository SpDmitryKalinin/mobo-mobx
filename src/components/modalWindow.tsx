import { observer } from "mobx-react";
import modalWindowStoreClass from "../store/ModalWindowStore";
import { generateUniqueKey } from "../utils/utils";
import SelectDefault from "./select/select";
import SelectPicture from "./select/selectPicture";
import StandModalSelectGroup from "./forms/StandModalSelectGroup";

const ModalWindow:React.FC = () => {
    const imgs = typeof modalWindowStoreClass.options !== 'boolean' ? modalWindowStoreClass.options.img : [];
    return (
        <div className={ modalWindowStoreClass.isOpen ? `modal-window modal-window--active` : `modal-window`}>
            <div className="modal-window__layout" onClick={() => modalWindowStoreClass.setIsOpen(false)}>

            </div>
            <div className="modal-window__container">
                <button className="modal-window__close" onClick={() => modalWindowStoreClass.setIsOpen(false)}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L18 18M18 18L35 35M18 18L35 1M18 18L1 35" stroke="black" strokeWidth="2">
                        </path>
                    </svg>
                </button>

                <div className="modal-window__title">
                    <h2 className="modal-window__title-item">APEX</h2>
                    <span className="modal-window__subtitle">Тумбы, Коллекция Apex</span>
                </div>
                <div className="modal-window__wrapper">
                    <div className="modal-window__options">
                        <StandModalSelectGroup/>
                    </div>
                    <div className="modal-window__img">
                        {
                            imgs.map(img => {
                                return <img key={generateUniqueKey()} src={img} />
                            })
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default observer(ModalWindow);