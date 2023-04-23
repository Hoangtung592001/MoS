import './InputTextArea.scss';

export default function InputTextArea({label, isRequired, isValid, errorMessage, ...props}: any) {
    return (
        <div className='input-text-area'>
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
            <textarea className={`${isValid ? 'input-text-area__input' : 'input-text-area__input input-text-area__input--invalid'}`} {...props}></textarea>
            {
                !isValid &&
                <div className='input-container-error'>
                    <span className='input-container-error__message'>
                        {errorMessage}
                    </span>
                </div>
            }
        </div>
    )
}