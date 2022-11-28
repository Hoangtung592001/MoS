import { ButtonLink, TextLink, Input } from '~/components';
import { BiCartAlt, BiSearchAlt2 } from 'react-icons/bi';
import localizations from '~/constants/locallizations';
import { ButtonLinkTypes } from '~/constants/enums';
import './Header.scss';

function Header() {
    return (
        <div className="header">
            <div className="header-container">
                <div className="header-nav">
                    <div className="header-nav-left">
                        <TextLink>{localizations.shopName}</TextLink>
                    </div>
                    <div className="header-nav-middle">
                        <div className="header-nav-middle__input">
                            <Input placeholder={localizations.inputSearchPlaceholder} />
                        </div>
                        <div className="header-nav-search-button">
                            <ButtonLink to="" type={ButtonLinkTypes.QUATERNARY_BUTTON}>
                                <span className="header-nav-search-button__icon">
                                    <BiSearchAlt2 />
                                </span>
                            </ButtonLink>
                        </div>
                    </div>
                    <div className="header-nav-right">
                        <div className="header-nav-right__button">
                            <ButtonLink to="" type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                {localizations.signIn}
                            </ButtonLink>
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink to="" type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                {localizations.myAccount}
                            </ButtonLink>
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink to="" type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                <span className="header-nav-right__button-inner">
                                    {localizations.basket}
                                    <BiCartAlt className="header-nav-right__icon" />
                                </span>
                            </ButtonLink>
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink to="" type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                {localizations.help}
                            </ButtonLink>
                        </div>
                    </div>
                </div>
                <div className="header-main-nav">
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.advancedSearch}</span>
                        </TextLink>
                    </div>
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.browseCollections}</span>
                        </TextLink>
                    </div>
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.rareBooks}</span>
                        </TextLink>
                    </div>
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.artAndCollectibles}</span>
                        </TextLink>
                    </div>
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.textBooks}</span>
                        </TextLink>
                    </div>
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.sellers}</span>
                        </TextLink>
                    </div>
                    <div className="header-main-links">
                        <TextLink>
                            <span>{localizations.startSelling}</span>
                        </TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
