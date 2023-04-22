import { ComboboxOptionText } from '@reach/combobox';
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
    label,
    isRequired,
    errorMessage,
    ...props
}: any) {
    return (
        <Combobox className="input-dropdown-input">
            {
                label && 
                <div className='input-container-label'>
                    <span className='input-container-label__message'>
                        {label}
                    </span>
                    { isRequired && 
                        <span className='input-container-label__message--required'>
                            *
                        </span>
                    }
                </div>
            }
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
            {
                !isValid &&
                <div className='input-container-error'>
                    <span className='input-container-error__message'>
                        {errorMessage}
                    </span>
                </div>
            }
            <ComboboxPopover className="input-dropdown-popover">
                <ComboboxList className="input-dropdown-container">
                    {selectItems &&
                        selectItems.map(({ id, value }: any) => (
                            <ComboboxOption
                                className="input-dropdown-data"
                                key={id}
                                value=""
                                onClick={(e) => {
                                    if (actionOnClick) {
                                        actionOnClick(id);
                                    }

                                    if (handleSelect) {
                                        handleSelect(value);
                                    }
                                }}
                            >
                                {value} <ComboboxOptionText/>
                            </ComboboxOption>
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}
