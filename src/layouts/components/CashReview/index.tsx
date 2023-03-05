import localizations from '~/constants/locallizations';

export type CashReviewProps = {
    title: string;
};

export default function CashReview({ title }: CashReviewProps) {
    return (
        <div className="shipping-address-review">
            <h3 className="shipping-address-review__title">{title}</h3>
            <div className="shipping-address-review-content">
                <span className="shipping-address-review-content__element">{localizations.paymentType}: Cash</span>
            </div>
        </div>
    );
}
