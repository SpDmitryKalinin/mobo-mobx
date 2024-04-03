import { useMemo } from "react";
import standsStoreClass from "../../store/StandsStore";
import SelectDefault from "../select/select";
import SelectPicture from "../select/selectPicture";
import modalWindowStoreClass from "../../store/ModalWindowStore";


const StandModalSelectGroup: React.FC = () => {
    console.log(standsStoreClass.standArray, modalWindowStoreClass.options);
    return (
        <div className="select-group">
            <SelectDefault placeholder="Ширина"/>
            <SelectPicture/>
        </div>
    )
}

export default StandModalSelectGroup;