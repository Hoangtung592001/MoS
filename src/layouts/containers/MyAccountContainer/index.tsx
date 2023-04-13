import { TextLinkBox } from "~/components"
import localizations from '~/constants/locallizations';
import './MyAccountContainer.scss';
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { accessTokenKey } from "~/constants";
import { checkTokenExpiry } from '~/commons/commonUsedFunctions';
import { bindActionCreators } from "redux";
import actionCreators from "~/redux";
import { useAppDispatch, useAppSelector } from "~/hooks";

export default function MyAccountContainer() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    const dispatch = useAppDispatch();
    const { checkAdminAction } = bindActionCreators(actionCreators, dispatch);
    const { isAdmin } = useAppSelector(state => state.user)
    
    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        } else {
            const tokenExpire = checkTokenExpiry(accessToken);
            if (tokenExpire) 
                navigate(routes.signin);
        }
    }, []);

    useEffect(() => {
        checkAdminAction(accessToken);
    }, []);

    return (
        <div className="my-account-container display-flex justify-content--space-between">
            <div className="my-account-row display-flex flex-direction--column">
                <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to={routes.myPurchases} text={localizations.viewMyPurchases} />
                    <TextLinkBox to={routes.basket} text={localizations.viewMyShoppingBasket} />
                </div>
                <h4 className="my-account-row__header">{localizations.myEmails}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to="" text={localizations.viewMyEmails} />
                </div>
            </div>
            <div className="my-account-row display-flex flex-direction--column">
                <h4 className="my-account-row__header">{localizations.myPersonalInfo}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to="" text={localizations.myNameEmailAndPassword} />
                    <TextLinkBox to="" text={localizations.myAccountInfo} />
                    <TextLinkBox to="" text={localizations.myAddressBook} />
                    <TextLinkBox to="" text={localizations.manageMyCreditCards} />
                </div>
            </div>
            <div className="my-account-row display-flex flex-direction--column">
                <h4 className="my-account-row__header">{localizations.myWants}</h4>
                {
                    isAdmin ? 
                    <div className="my-account-row-link-box">
                        <TextLinkBox to={routes.books} text={localizations.manageBooks} />
                        <TextLinkBox to={routes.addNewBook} text={localizations.addNewBook} />
                        <TextLinkBox to={routes.addNewAuthor} text={localizations.createNewAuthor} />
                        <TextLinkBox to={routes.addNewPublisher} text={localizations.createNewPublisher} />
                    </div>
                    : 
                    <div className="my-account-row-link-box">
                        <TextLinkBox to={routes.home} text={localizations.listAndMaintainMyWants} />
                        <TextLinkBox to={routes.home} text={localizations.myRecentlMatchedWants} />
                        <TextLinkBox to={routes.home} text={localizations.learnMoreAboutWants} />
                        <TextLinkBox to={routes.home} text={localizations.downloadMyWantsReport} />
                    </div>
                }
            </div>
            <div className="my-account-row display-flex flex-direction--column">
                <h4 className="my-account-row__header">{localizations.help}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to="" text={localizations.moSBooksHelp} />
                    <TextLinkBox to="" text={localizations.contactCustomerSupport} />
                    <TextLinkBox to="" text={localizations.communityForums} />
                </div>
            </div>
        </div>
    );
}