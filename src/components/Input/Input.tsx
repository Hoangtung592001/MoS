import './Input.scss';

function Input({ inputType, isValid, label, isRequired, errorMessage, ...props }: any) {
    return (
        <div className='input-container'>
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
            <input
                type="text"
                className={
                    inputType
                        ? `input--${inputType} input ${isValid != null && !isValid && 'input--invalid'}`
                        : `input ${isValid != null && !isValid && 'input--invalid'}`
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
        </div>
    );
}

export default Input;
