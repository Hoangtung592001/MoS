import './Button.scss';

function Button({ type, children, ...props }: any) {
    return (
        <button className={type ? `button button--${type}` : 'button'} {...props}>
            {children}
        </button>
    );
}

export default Button;
