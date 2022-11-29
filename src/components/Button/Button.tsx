import './Button.scss';

function Button({ type, children }: any) {
    return (
        <button className={type ? `button--${type} button` : 'button'}>
            {children}
        </button>
    );
}

export default Button;
