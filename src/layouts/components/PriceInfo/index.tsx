import localizations from '~/constants/locallizations';
import { TextLink, Button } from '~/components';
import { SlBasket } from 'react-icons/sl';
import { ButtonTypes, TextLinkTypes } from '~/constants/enums';
import './PriceInfo.scss';

interface PriceInfoProps {
    price: number;
    bookId: string;
    onAddToBasket: any;
    isLoading: boolean;
}
export default function PriceInfo(props: PriceInfoProps) {
    return (
        <div className="price-info">
            <h4 className="price-info__header">{localizations.buyNew}</h4>
            <h4 className="price-info__price">US$ {props.price}</h4>
            <span className="price-info__where">{localizations.within} U.S.A</span>
            <div className="price-info-link">
                <TextLink type={TextLinkTypes.BLUE}>
                    <span>Destination, rates & speeds</span>
                </TextLink>
            </div>
            <div className="price-info-button">
                <Button type={ButtonTypes.ADDTOBASKET} onClick={props.onAddToBasket} isLoading={props.isLoading}>
                    <span className="price-info__add-to-basket">
                        <SlBasket className="price-info-button__icon" />
                        {localizations.addToBasket}
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
