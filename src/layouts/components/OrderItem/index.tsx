import { convertConcurrency } from '~/commons/commonUsedFunctions';
import { redirectToBookDetailByBookId } from '~/commons/URLs';
import { TextLink } from '~/components';
import './OrderItem.scss';
import localizations from '~/constants/locallizations';

export type OrderItemProps = {
    bookId: string;
    imgUrl: string;
    title: string;
    quantity: number;
    finalPriceEach: number;
    originalPriceEach: number;
    disablePrice?: boolean;
    Button?: any;
    showQuantity?: boolean;
    url?: string;
    isBookDeleted?: boolean;
    authorName?: string;
};

export default function OrderItem({
    bookId,
    imgUrl,
    title,
    quantity,
    finalPriceEach,
    originalPriceEach,
    disablePrice = false,
    Button,
    showQuantity = true,
    url,
    isBookDeleted,
    authorName
}: OrderItemProps) {
    return (
        <div className="order-item display-flex">
            <div className="order-item-product display-flex">
                <div className="order-item-product-img">
                    <img src={imgUrl} className="order-item-product-img__img" />
                </div>
                <div className="order-item-product-intro display-flex flex-direction--column">
                    <div>
                        {
                            isBookDeleted ? 
                            <>
                                <span className="order-item-product-intro__title">{title}</span>
                                <span className='basket-table-row-info__error'>
                                    {
                                        `(${localizations.bookDeleted})`
                                    }
                                </span>
                            </>
                            :
                            <>
                                <TextLink to={url ? url : redirectToBookDetailByBookId(bookId)}>
                                    <span className="order-item-product-intro__title">{title}</span>
                                </TextLink>
                            </>
                        }
                    </div>
                    {
                        showQuantity ? <span className="order-item-product-intro__quantity">x{quantity}</span>
                        : <span className="order-item-product-intro__quantity--author">{authorName}</span>
                    }
                </div>
            </div>
            <div className="order-item-price">
                {
                !disablePrice &&
                    <>
                        <span className="order-item-price__original">${convertConcurrency(originalPriceEach)}</span>
                        <span className="order-item-price__final">${convertConcurrency(finalPriceEach)}</span>
                    </>
                }
                {
                    Button
                }
            </div>
        </div>
    );
}
