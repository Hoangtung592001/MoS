import './Input.scss';

interface InputProps {
    type?: string;
    placeholder: string;
}

function Input({ type, placeholder }: InputProps) {
    return <input type="text" className={type ? `input--${type} input` : 'input'} placeholder={placeholder} />;
}

export default Input;
