import { ButtonLink, TextLink, Input } from '~/components';
import { BiCartAlt, BiSearchAlt2 } from 'react-icons/bi';
import localizations from '~/constants/locallizations';
import { ButtonLinkTypes } from '~/constants/enums';
import './Header.scss';
import routes, { getBookDetailsRoute } from '~/config/routes';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { accessTokenKey } from '~/constants';
import { useCallback, useEffect, useMemo } from 'react';
import InputDropdown from '~/components/InputDropdown';
import { InputDropdownItem } from '~/components/InputDropdown';
import { useState } from 'react';
import useBookSearch from '~/hooks/useBookSearch';
import jwtDecode from 'jwt-decode';
import { checkTokenExpiry } from '~/commons/commonUsedFunctions';
import { getSearchedBooksUrl } from '~/commons/URLs';
import InputDropdownV2 from '~/components/InputDropdownV2';

function Header() {
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
    const { status } = useAppSelector((state) => state.basketReducer);
    const dispatch = useAppDispatch();
    const { signOut, getBasketTotalItems } = bindActionCreators(actionCreators, dispatch);
    const { basketTotal } = useAppSelector((state) => state.basketReducer);
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const { books } = useBookSearch(query);

    const selectItems = useMemo<Array<InputDropdownItem>>(() => {
        return books.map((book) => {
            const selectItem: InputDropdownItem = {
                id: book.id,
                value: book.title,
            };

            return selectItem;
        });
    }, [books]);

    const handleSelect = useCallback((selectedItem: string) => {
        if (selectedItem) {
            setQuery('');
            navigate(getBookDetailsRoute(selectedItem));
        }
    }, []);

    useEffect(() => {
        const isTokenExpire = checkTokenExpiry(accessToken)
        if (!isTokenExpire) {
            getBasketTotalItems(accessToken);
        }
        if (accessToken) {
            const tokenExpire = checkTokenExpiry(accessToken);
            if (tokenExpire) setIsTokenExpired(true);
        } else if (!accessToken) {
            setIsTokenExpired(true);
        }
    }, [status]);
    return (
        <div className="header">
            <div className="header-container">
                <div className="header-nav">
                    <div className="header-nav-left">
                        <Link to={routes.home}>
                            <img
                                src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png"
                                alt="MoSBooks"
                                className="sign-in__logo"
                            />
                        </Link>
                    </div>
                    <div className="header-nav-middle">
                        <div className="header-nav-middle__input">
                            <InputDropdown
                                placeholder={localizations.inputSearchPlaceholder}
                                selectItems={selectItems}
                                value={query}
                                setValue={setQuery}
                                key={selectedOption}
                                actionOnClick={handleSelect}
                            />
                        </div>
                        <div className="header-nav-search-button">
                            <ButtonLink to={getSearchedBooksUrl(query)} type={ButtonLinkTypes.QUATERNARY_BUTTON}>
                                <span className="header-nav-search-button__icon">
                                    <BiSearchAlt2 />
                                </span>
                            </ButtonLink>
                        </div>
                    </div>
                    <div className="header-nav-right">
                        <div className="header-nav-right__button">
                            {isTokenExpired ? (
                                <ButtonLink to={routes.signin} type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                    {localizations.signin}
                                </ButtonLink>
                            ) : (
                                <ButtonLink
                                    to={routes.home}
                                    type={ButtonLinkTypes.PRIMARY_BUTTON}
                                    onClick={() => {
                                        signOut();
                                        navigate(routes.home);
                                        window.location.reload();
                                    }}
                                >
                                    {localizations.signOut}
                                </ButtonLink>
                            )}
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink to={routes.myAccount} type={ButtonLinkTypes.PRIMARY_BUTTON}>
                                {localizations.myAccount}
                            </ButtonLink>
                        </div>
                        <div className="header-nav-right__button">
                            <ButtonLink
                                to={routes.basket}
                                type={ButtonLinkTypes.PRIMARY_BUTTON}
                                isBasket={true}
                                numberOfItems={basketTotal}
                            >
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
                        <TextLink to={routes.bookList}>
                            <span>{localizations.bookList}</span>
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
