import { TextLinkBox } from "~/components"
import localizations from '~/constants/locallizations';
import { useAppSelector } from "~/hooks";
import './MyAccountContainer.scss';
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { accessTokenKey } from "~/constants";

export default function MyAccountContainer() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    
    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        }
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
                <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to="" text={localizations.myNameEmailAndPassword} />
                    <TextLinkBox to="" text={localizations.myAccountInfo} />
                    <TextLinkBox to="" text={localizations.myAddressBook} />
                    <TextLinkBox to="" text={localizations.manageMyCreditCards} />
                </div>
            </div>
            <div className="my-account-row display-flex flex-direction--column">
                <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to="" text={localizations.listAndMaintainMyWants} />
                    <TextLinkBox to="" text={localizations.myRecentlMatchedWants} />
                    <TextLinkBox to="" text={localizations.learnMoreAboutWants} />
                    <TextLinkBox to="" text={localizations.downloadMyWantsReport} />
                </div>
            </div>
            <div className="my-account-row display-flex flex-direction--column">
                <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
                <div className="my-account-row-link-box">
                    <TextLinkBox to="" text={localizations.moSBooksHelp} />
                    <TextLinkBox to="" text={localizations.contactCustomerSupport} />
                    <TextLinkBox to="" text={localizations.communityForums} />
                </div>
            </div>
        </div>
    );
}