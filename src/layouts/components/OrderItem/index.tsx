import { convertConcurrency } from '~/commons/commonUsedFunctions';
import { redirectToBookDetailByBookId } from '~/commons/URLs';
import { TextLink } from '~/components';
import './OrderItem.scss';

export type OrderItemProps = {
    bookId: string;
    imgUrl: string;
    title: string;
    quantity: number;
    finalPriceEach: number;
    originalPriceEach: number;
};

export default function OrderItem({
    bookId,
    imgUrl,
    title,
    quantity,
    finalPriceEach,
    originalPriceEach,
}: OrderItemProps) {
    return (
        <div className="order-item display-flex">
            <div className="order-item-product display-flex">
                <div className="order-item-product-img">
                    <img src={imgUrl} className="order-item-product-img__img" />
                </div>
                <div className="order-item-product-intro display-flex flex-direction--column">
                    <TextLink to={redirectToBookDetailByBookId(bookId)}>
                        <span className="order-item-product-intro__title">{title}</span>
                    </TextLink>
                    <span className="order-item-product-intro__quantity">x{quantity}</span>
                </div>
            </div>
            <div className="order-item-price">
                <span className="order-item-price__original">${convertConcurrency(originalPriceEach)}</span>
                <span className="order-item-price__final">${convertConcurrency(finalPriceEach)}</span>
            </div>
        </div>
    );
}
