import { ButtonLink, TextLink, Input } from '~/components';
import { BiCartAlt, BiSearchAlt2 } from 'react-icons/bi';
import localizations from '~/constants/locallizations';
import { ButtonLinkTypes } from '~/constants/enums';
import './HeaderIcon.scss';
import routes from '~/config/routes';

function HeaderIcon() {
    return (
        <div className="header-icon-only">
            <TextLink to={routes.home}>
                <img
                    src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png"
                    alt=""
                />
            </TextLink>
        </div>
    );
}

export default HeaderIcon;
