import './Footer.scss';
import { TextLink } from '~/components';
import localizations from '~/constants/locallizations';
import { BiArrowToTop } from 'react-icons/bi';
import { useCallback } from 'react';

function Footer() {
    const backToTop = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-to-top'>
                    <TextLink onClick={backToTop}>
                        <span className='footer-to-top__text'>
                            {localizations.backToTop}
                        </span>
                    </TextLink>
                    <BiArrowToTop className='footer__to-top-icon'/>
                </div>
                <div className='footer-site-links'>
                    <ul className='footer-site-links-container'>
                        <li>
                            <TextLink>
                                <span className='footer-site__link--header footer-site__link'>
                                    {localizations.shopWithUs}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.advancedSearch}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.browseCollections}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.myAccount}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.myOrders}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.viewBasket}
                                </span>
                            </TextLink>
                        </li>
                    </ul>
                    <ul className='footer-site-links-container'>
                        <li>
                            <TextLink>
                                <span className='footer-site__link--header footer-site__link'>
                                    {localizations.sellWithUs}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.startSelling}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.joinOurAffiliateProgram}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.bookBuyBack}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.referASeller}
                                </span>
                            </TextLink>
                        </li>
                    </ul>
                    <ul className='footer-site-links-container'>
                        <li>
                            <TextLink>
                                <span className='footer-site__link--header footer-site__link'>
                                    {localizations.aboutUs}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.aboutMosBooks}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.media}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.careers}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.forums}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.privacyPolicy}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.designatedAgent}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.accessibility}
                                </span>
                            </TextLink>
                        </li>
                    </ul>
                    <ul className='footer-site-links-container'>
                        <li>
                            <TextLink>
                                <span className='footer-site__link--header footer-site__link'>
                                    {localizations.findHelp}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.help}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.customerSupport}
                                </span>
                            </TextLink>
                        </li>
                    </ul>
                    <ul className='footer-site-links-container'>
                        <li>
                            <TextLink>
                                <span className='footer-site__link--header footer-site__link'>
                                    {localizations.followMoSBooks}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.facebook}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                    {localizations.twitter}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.instagram}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.youtube}
                                </span>
                            </TextLink>
                        </li>
                        <li>
                            <TextLink>
                                <span className='footer-site__link'>
                                {localizations.podcast}
                                </span>
                            </TextLink>
                        </li>
                    </ul>
                </div>
                <div>

                </div>
                <div className='footer-copyright'>
                <span className='footer-copyright__text'>
                        {localizations.termsAndConditions}
                    </span>
                    <span className='footer-copyright__text'>
                        {localizations.copyRight}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
