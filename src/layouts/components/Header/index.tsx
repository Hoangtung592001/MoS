import { Button, ButtonLink } from '~/components';
import { BiCartAlt, BiSearchAlt2 } from 'react-icons/bi';
import './Header.scss';
function Header() {
    return (
        <div className="header">
            <ButtonLink to="/">
                Hello World!
                <BiCartAlt className="header__icon" />
            </ButtonLink>

            <ButtonLink to="/" type="secondary">
                Search
            </ButtonLink>

            <ButtonLink to="/" type="tertiary">
                Search
            </ButtonLink>
            <ButtonLink to="/" type="quaternary">
                <BiSearchAlt2 />
            </ButtonLink>
        </div>
    );
}

export default Header;
