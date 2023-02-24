import { SpinnerCircularFixed } from 'spinners-react';
import './Button.scss';

function Button({ type, children, isLoading, ...props }: any) {
    return (
        <button className={type ? `button button--${type}` : 'button'} {...props}>
            {isLoading ? <SpinnerCircularFixed color="#fff" size={21} secondaryColor="#dc2a2b" /> : children}
        </button>
    );
}

export default Button;
