import { Input } from '~/components';
import { InputTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';

type ShippingAddressReviewProps = {
    creditCardNumber: string;
    cardDescription: string;
    expirtaionDate: Date;
    title: string;
    securityCode: string;
    setSecurityCode: React.Dispatch<React.SetStateAction<string>>;
    IsSecurityCodeValid: boolean;
    setIsSecurityCodeValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VisaReview({
    title,
    creditCardNumber,
    cardDescription,
    expirtaionDate,
    securityCode,
    setSecurityCode,
    IsSecurityCodeValid,
    setIsSecurityCodeValid,
}: ShippingAddressReviewProps) {
    const convertedExpirationDate = new Date(expirtaionDate);
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
                        <Input
                            inputType={InputTypes.SECURITY_CODE}
                            value={securityCode}
                            onChange={(e: any) => {
                                setSecurityCode(e.target.value);
                                setIsSecurityCodeValid(true);
                            }}
                            isValid={IsSecurityCodeValid}
                        />
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
