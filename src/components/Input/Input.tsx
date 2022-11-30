import './Input.scss';

function Input({ type, ...props }: any) {
    return <input type="text" className={type ? `input--${type} input` : 'input'} {...props} />;
}

export default Input;
