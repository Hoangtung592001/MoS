import localizations from '~/constants/locallizations';
import { TextLink, Button } from '~/components';
import { SlBasket } from 'react-icons/sl';
import { ButtonTypes, TextLinkTypes } from '~/constants/enums';
import './PriceInfo.scss';
export default function PriceInfo() {
    return (
        <div className="price-info">
            <h4 className="price-info__header">{localizations.buyNew}</h4>
            <h4 className="price-info__price">US$ 60.53</h4>
            <span className="price-info-shipping">
                {localizations.shipping}: <span className="price-info-shipping__price">US$ 5.55</span>
            </span>
            <span className="price-info__where">{localizations.within} U.S.A</span>
            <div className="price-info-link">
                <TextLink type={TextLinkTypes.BLUE}>
                    <span>Destination, rates & speeds</span>
                </TextLink>
            </div>
            <div className="price-info-button">
                <Button type={ButtonTypes.ADDTOBASKET}>
                    <span className="price-info__add-to-basket">
                        <SlBasket className="price-info-button__icon" />
                        Add to basket
                    </span>
                </Button>
            </div>
            <div className="price-info-link price-info-link--return">
                <TextLink type={TextLinkTypes.BLUE}>
                    <span>30 {localizations.dayReturnPolicy}</span>
                </TextLink>
            </div>
        </div>
    );
}
