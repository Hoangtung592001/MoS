import { ButtonLink, TextLink, Input } from '~/components';
import { BiCartAlt, BiSearchAlt2 } from 'react-icons/bi';
import localizations from '~/constants/locallizations';
import { ButtonLinkTypes } from '~/constants/enums';
import './Header.scss';
import routes from '~/config/routes';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import config from '~/config';
function Header() {
    const { accessToken } = useAppSelector(state => state.user.token);
    const dispatch = useAppDispatch();
    const { signOut } = bindActionCreators(actionCreators, dispatch);

    return (
        <div className="header">
            <div className="header-container">
                <div className="header-nav">
                    <div className="header-nav-left">
                        <img 
                            src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png" 
                            alt="MoSBooks" 
                            className='sign-in__logo'
                        />
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
                            {
                                !accessToken ?
                                <ButtonLink to={routes.signin} type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                    {localizations.signin}
                                </ButtonLink>
                                :
                                <ButtonLink to={routes.home} type={ButtonLinkTypes.PRIMARY_BUTTON} onClick={() => {
                                    signOut();
                                }}>
                                    {localizations.signOut}
                                </ButtonLink>
                            }
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink to={routes.myAccount} type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                {localizations.myAccount}
                            </ButtonLink>
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink to={routes.basket} type={ButtonLinkTypes.PRIMARY_BUTTON} isBasket={true} numberOfItems={2}>
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
