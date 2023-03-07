import './InputDropdown.scss';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';

export type InputDropdownItem = {
    id: any;
    value: string;
};

export default function InputDropdown({
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
        <Combobox className="input-dropdown-input">
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={
                    isValid != null && !isValid
                        ? `input-dropdown-input__input input-dropdown-input__input--invalid`
                        : `input-dropdown-input__input`
                }
                {...props}
            />
            <ComboboxPopover className="input-dropdown-popover">
                <ComboboxList className="input-dropdown-container">
                    {selectItems &&
                        selectItems.map(({ id, value }: any) => (
                            <ComboboxOption
                                className="input-dropdown-data"
                                key={id}
                                value={value}
                                onClick={(e) => {
                                    console.log(id);
                                    actionOnClick(id);
                                }}
                            />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}
