import { Button, ButtonLink } from '~/components';
import { BiCartAlt } from 'react-icons/bi';
import './Header.scss';
function Header() {
    return (
        <div className="header">
            <ButtonLink to="/" text="Basket" Icon={BiCartAlt} />
            <ButtonLink to="/" text="Basket" Icon={BiCartAlt} />
            <ButtonLink to="/" text="Basket Help" />
            <ButtonLink to="/" Icon={BiCartAlt} />
        </div>
    );
}

export default Header;
