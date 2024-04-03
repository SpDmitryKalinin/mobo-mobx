import React from "react";
import Select from 'react-select';
import { selectImageInterface } from "../../interfaces/components";

const options = [
    { value: 'chocolate', label: 'label', img: "https://placehold.co/600x400"},
    { value: 'strawberry', label: 'Strawberry', img: "https://placehold.co/600x400" },
    { value: 'vanilla', label: 'Vanilla', img: "https://placehold.co/600x400" }
]



const createOptions = (options: selectImageInterface[]) => {
    return options.map(option => {
        return {
            value: option.value,
            label: <div className="react-select__option-wrapper">
                <span className="react-select__option-text-content">{option.label}</span>
                <div className="react-select__option-picture">
                    <img className="react-select__option-img" src={option.img}/>
                </div>
            </div>
        }
    })
}

const SelectPicture: React.FC = () => {
    
    return (
        <Select 
            className="react-select-container react-select-container--picture"
            classNamePrefix="react-select"
            isSearchable={false}
            options={createOptions(options)}
            menuIsOpen={true}
        />
    )
}

export default SelectPicture;