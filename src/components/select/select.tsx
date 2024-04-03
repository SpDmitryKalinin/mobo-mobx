import React from "react";
import Select, { components } from "react-select";

interface SelectInterface {
    placeholder: string;
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]

const DropdownIndicator = (
    // @ts-ignore
    props: ElementConfig<typeof components.DropdownIndicator>
) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L8 8.5L15 1.5" stroke="black" strokeWidth="2" />
            </svg>
        </components.DropdownIndicator>
    );
};

const SelectDefault: React.FC<SelectInterface> = ({placeholder}) => {
    return (
        <Select
            className="react-select-container"
            classNamePrefix="react-select"
            components={{ DropdownIndicator }}
            isSearchable={false}
            placeholder= {placeholder}
            options={options}
        />
    )
}

export default SelectDefault;