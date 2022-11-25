import './ButtonLink.scss';
import { Link } from 'react-router-dom';
function Button({ to, text = null, Icon = null }: any) {
    return (
        <Link to={to} className="button-link">
            {Icon !== null ? (
                <>
                    {text !== null ? <span>{text}</span> : null}
                    <Icon className={text !== null ? `button-link__icon` : `button-link__icon--no-text`} />
                </>
            ) : (
                <span>{text}</span>
            )}
        </Link>
    );
}

export default Button;
