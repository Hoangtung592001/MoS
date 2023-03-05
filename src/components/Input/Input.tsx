import './Input.scss';

function Input({ inputType, isValid, ...props }: any) {
    return (
        <input
            type="text"
            className={
                inputType
                    ? `input--${inputType} input ${isValid != null && !isValid && 'input--invalid'}`
                    : `input ${isValid != null && !isValid && 'input--invalid'}`
            }
            {...props}
        />
    );
}

export default Input;
