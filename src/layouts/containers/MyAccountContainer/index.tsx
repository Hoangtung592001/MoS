import { TextLinkBox } from "~/components"
import localizations from '~/constants/locallizations';
import './MyAccountContainer.scss';

export default function MyAccountContainer() {
    return <div className="my-account-container display-flex justify-content--space-between">
        <div className="my-account-row display-flex flex-direction--column">
            <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
            <div className="my-account-row-link-box">
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
            </div>
            <h4 className="my-account-row__header">{localizations.myEmails}</h4>
            <div className="my-account-row-link-box">
                <TextLinkBox to='' text='View My Purchases' />
            </div>
        </div>
        <div className="my-account-row display-flex flex-direction--column">
            <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
            <div className="my-account-row-link-box">
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
            </div>
        </div>
        <div className="my-account-row display-flex flex-direction--column">
            <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
            <div className="my-account-row-link-box">
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
            </div>
        </div>
        <div className="my-account-row display-flex flex-direction--column">
            <h4 className="my-account-row__header">{localizations.myPurchases}</h4>
            <div className="my-account-row-link-box">
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
                <TextLinkBox to='' text='View My Purchases' />
            </div>
        </div>
    </div>
}