import './DefaultValueInput.scss';
import { useState } from 'react';
function DefaultValueInput({ inputType, isValid, defaultValue, action, ...props }: any) {
    const [value, setValue] = useState(defaultValue);

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
                action(e.target.value);
            }}
            {...props}
        />
    );
}

export default DefaultValueInput;
