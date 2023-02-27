import './InputDropdown.scss';
import { useState, useCallback, useRef } from 'react';
import Select, { SelectItem } from '../Select';
import { SelectTypes } from '~/constants/enums';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';

export type InputDropdownItem = {
    id: any;
    value: string;
};

export default function InputDropdown({ inputType, selectItems, handleSelect, value, setValue, ...props }: any) {
    return (
        <Combobox className="input-dropdown-input" onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input-dropdown-input__input"
                {...props}
            />
            <ComboboxPopover className="input-dropdown-popover">
                <ComboboxList className="input-dropdown-container">
                    {selectItems &&
                        selectItems.map(({ id, value }: any) => (
                            <ComboboxOption className="input-dropdown-data" key={id} value={value} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}
