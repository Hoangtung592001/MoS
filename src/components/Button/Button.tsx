import './Button.scss';

function Button({ type, children }: any) {
    return (
        <button className={type ? `button button--${type}` : 'button'}>
            {children}
        </button>
    );
}

export default Button;
