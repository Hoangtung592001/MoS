import { Input } from '~/components';
import { InputTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';

type ShippingAddressReviewProps = {
    creditCardNumber: string;
    cardDescription: string;
    expirtaionDate: Date;
    title: string;
};

export default function PaymentReview({
    title,
    creditCardNumber,
    cardDescription,
    expirtaionDate,
}: ShippingAddressReviewProps) {
    const convertedExpirationDate = new Date(expirtaionDate);
    console.log(convertedExpirationDate);
    return (
        <div className="shipping-address-review">
            <h3 className="shipping-address-review__title">{title}</h3>
            <div className="shipping-address-review-content">
                <span className="shipping-address-review-content__element">
                    {localizations.cardNumber}: {creditCardNumber}
                </span>
                <span className="shipping-address-review-content__element">
                    {localizations.cardDescription}: {cardDescription}
                </span>
                <span className="shipping-address-review-content__element display-flex">
                    {localizations.enterCreditCardSecurityCode}:
                    <div className="shipping-address-review-content__element-input">
                        <Input inputType={InputTypes.SECURITY_CODE} />
                    </div>
                </span>
                <span className="shipping-address-review-content__element">
                    {localizations.expirationDate}:{' '}
                    {`${convertedExpirationDate.getMonth()} / ${convertedExpirationDate.getFullYear()}`}
                </span>
            </div>
        </div>
    );
}
