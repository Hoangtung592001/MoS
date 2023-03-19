import { SpinnerCircularFixed } from 'spinners-react';
import './Button.scss';

function Button({ type, children, isLoading, loadingColor, ...props }: any) {
    return (
        <button className={type ? `button button--${type}` : 'button'} {...props} disabled={isLoading}>
            {isLoading ? (
                <SpinnerCircularFixed
                    className="button__spinner"
                    color="#fff"
                    size={21}
                    secondaryColor={loadingColor ? loadingColor : '#dc2a2b'}
                />
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
