import './ShippingAddressReview.scss';

type ShippingAddressReviewProps = {
    title: string;
    fullName: string;
    addressLine: string;
    country: string;
};

export default function ShippingAddressReview({ title, fullName, addressLine, country }: ShippingAddressReviewProps) {
    return (
        <div className="shipping-address-review">
            <h3 className="shipping-address-review__title">{title}</h3>
            <div className="shipping-address-review-content">
                <span className="shipping-address-review-content__element">{fullName}</span>
                <span className="shipping-address-review-content__element">{addressLine}</span>
                <span className="shipping-address-review-content__element">{country}</span>
            </div>
        </div>
    );
}
