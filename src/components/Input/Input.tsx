import './Input.scss';

function Input({ inputType, ...props }: any) {
    return <input type="text" className={inputType ? `input--${inputType} input` : 'input'} {...props} />;
}

export default Input;
