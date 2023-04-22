import './InputDropdownV2.scss';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import Dropdown from 'react-bootstrap/Dropdown';

export type InputDropdownItem = {
    id: any;
    value: string;
};

export default function InputDropdownV2({
    inputType,
    selectItems,
    handleSelect,
    value,
    setValue,
    isValid,
    setKey,
    actionOnClick,
    ...props
}: any) {
    return (
        <div className="input-dropdown-input">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={
                    isValid != null && !isValid
                        ? `input-dropdown-input__input input-dropdown-input__input--invalid`
                        : `input-dropdown-input__input`
                }
                {...props}
            />
            <div className="input-dropdown-popover">
                <Dropdown.Menu show className="input-dropdown-container">
                    <Dropdown.Item className="input-dropdown-data" eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item className="input-dropdown-data" eventKey="3">Something else here</Dropdown.Item>
                </Dropdown.Menu>
            </div>
        </div>
        // <Combobox className="input-dropdown-input" onSelect={handleSelect ? handleSelect : null}>
        //     <ComboboxInput
        //         value={value}
        //         onChange={(e) => setValue(e.target.value)}
                // className={
                //     isValid != null && !isValid
                //         ? `input-dropdown-input__input input-dropdown-input__input--invalid`
                //         : `input-dropdown-input__input`
                // }
                // {...props}
        //     />
        //     <ComboboxPopover className="input-dropdown-popover">
        //         <ComboboxList className="input-dropdown-container">
        //             {selectItems &&
        //                 selectItems.map(({ id, value }: any) => (
        //                     <ComboboxOption
        //                         className="input-dropdown-data"
        //                         key={id}
        //                         value={`${value}`}
        //                         onClick={(e) => {
        //                             if (actionOnClick) {
        //                                 actionOnClick(id);
        //                             }
        //                         }}
        //                     />
        //                 ))}
        //         </ComboboxList>
        //     </ComboboxPopover>
        // </Combobox>
    );
}
