import './DefaultValueInput.scss';
import { useState } from 'react';
function DefaultValueInput({ inputType, defaultValue, actionOnBlur, itemId, ...props }: any) {
    const [value, setValue] = useState(defaultValue);
    const [isValid, setIsValid] = useState<boolean>(true);
    return (
        <input
            type="text"
            className={
                inputType
                    ? `default-value-input--${inputType} default-value-input ${
                          isValid != null && !isValid && 'default-value-input--invalid'
                      }`
                    : `default-value-input ${isValid != null && !isValid && 'default-value-input--invalid'}`
            }
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            onBlur={() => {
                if (actionOnBlur)(
                    actionOnBlur(value, setIsValid, itemId)
                )
            }}
            {...props}
        />
    );
}

export default DefaultValueInput;
