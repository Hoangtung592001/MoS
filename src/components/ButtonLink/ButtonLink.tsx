import './ButtonLink.scss';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    type?: string;
    children: any;
    isBasket?: boolean;
    numberOfItems?: number;
}

function Button({ to, type = '', isBasket, numberOfItems, children, ...props }: any) {
    return (
        <Link to={to} className={type ? `button-link--${type} button-link` : 'button-link'} {...props}>
            {children}
            {isBasket ? <span className="button-link__number-items">{numberOfItems}</span> : null}
        </Link>
    );
}

export default Button;
