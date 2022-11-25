import './ButtonLink.scss';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    type?: string;
    children: any;
}

function Button({ to, type = '', children }: ButtonProps) {
    return (
        <Link to={to} className={type ? `button-link--${type} button-link` : 'button-link'}>
            {children}
        </Link>
    );
}

export default Button;
