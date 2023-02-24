import './InputDropdown.scss';
import { useState, useCallback, useRef } from 'react';
export default function InputDropdown({ inputType, ...props }: any) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState<string>();
    const onOptionClick = useCallback((option: string) => {
        setValue(option);
    }, []);
    return (
        <div className="input-dropdown">
            <div className="input-dropdown-input">
                <input
                    type="text"
                    onFocus={(e) => {
                        setFocused(true);
                    }}
                    onBlur={(e) => {
                        setTimeout(() => {
                            setFocused(false);
                        }, 100);
                    }}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    className={
                        inputType
                            ? `input-dropdown__input--${inputType} input-dropdown__input`
                            : 'input-dropdown__input'
                    }
                    {...props}
                />
            </div>
            {focused && (
                <div className="input-dropdown-container">
                    <button
                        className="input-dropdown-data"
                        onClick={(e) => {
                            onOptionClick('Hello world');
                        }}
                    >
                        <span className="input-dropdown-data__text">Hello world!</span>
                    </button>
                </div>
            )}
        </div>
    );
}
