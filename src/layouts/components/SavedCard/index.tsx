import { Button } from '~/components';
import { ButtonTypes } from '~/constants/enums';
import { PaymentOption } from '~/constants/interfaces';
import './SavedCard.scss';

type SavedCardProps = {
    paymentOptions: Array<PaymentOption>;
};

export default function SavedCard({ paymentOptions }: SavedCardProps) {
    return (
        <div className="saved-card">
            <div className="saved-card-row">
                <h5 className="saved-card-row__item">Type</h5>
                <h5 className="saved-card-row__item">Expiration Date</h5>
                <h5 className="saved-card-row__item saved-card-row__item-button"></h5>
            </div>
            {paymentOptions.map((paymentOption, index) => {
                return (
                    <div key={index} className="saved-card-row">
                        <h5 className="saved-card-row__item">
                            {paymentOption.paymentOptionTypeDescription.name} {paymentOption.cardNumber}
                        </h5>
                        <h5 className="saved-card-row__item">
                            {new Date(paymentOption.expiryDate).getMonth()}/
                            {new Date(paymentOption.expiryDate).getFullYear()}
                        </h5>
                        <div className="saved-card-row__item saved-card-row__item-button">
                            <Button type={ButtonTypes.USE_SAVED_CARD}>
                                <span>Use</span>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
