import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { useEffect } from 'react';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useAppSelector } from '~/hooks';
import localizations from '~/constants/locallizations';
import { orderStatuses } from '~/constants';
import OrderItem from '~/layouts/components/OrderItem';
import './MyPurchasesContainer.scss';
import { BiStore } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';
export default function MyPurchasesContainer() {
    const dispatch = useDispatch();
    const { getOrders } = bindActionCreators(actionCreators, dispatch);
    const accessToken = getAccessTokenFromCookies();
    const navigate = useNavigate();
    const items = useAppSelector((state) => state.orderReducer.items);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.home);
        } else {
            getOrders(accessToken);
        }
    }, []);

    return (
        <div className="my-purchases-container display-flex flex-direction--column">
            <h3 className="my-purchases-container__title">{localizations.myPurchases}</h3>
            {items.map((item) => {
                let totalCost = 0;
                const orderAt = new Date(item.createdAt);

                item.orderDetails.forEach((orderDetail) => {
                    totalCost += orderDetail.finalPrice;
                });

                totalCost += item.shippingFee;
                return (
                    <div className="my-purchases-container-order">
                        <div className="my-purchases-container-order-intro display-flex justify-content--space-between">
                            <div className="my-purchases-container-order-intro-shop-name display-flex align-items--center">
                                <BiStore className="my-purchases-container-order-intro-shop-name__icon" />
                                <h3 className="my-purchases-container-order-intro-shop-name__name">
                                    {localizations.shopName}
                                </h3>
                                <span className="my-purchases-container-order-intro-shop-name__orderAt">
                                    Ordered At {`${orderAt.getDate()}/${orderAt.getMonth()}/${orderAt.getFullYear()}`}
                                </span>
                            </div>
                            <div className="my-purchases-container-order-intro-status">
                                {orderStatuses[item.orderStatusId]}
                            </div>
                        </div>
                        <div className="my-purchases-container-order-details display-flex flex-direction--column">
                            {item.orderDetails.map((orderDetail) => {
                                return (
                                    <div className="my-purchases-container-order-details-item">
                                        <OrderItem
                                            bookId={orderDetail.basketItem.book.id}
                                            imgUrl={orderDetail.basketItem.book.bookImage.url}
                                            title={orderDetail.basketItem.book.title}
                                            quantity={orderDetail.basketItem.quantity}
                                            finalPriceEach={orderDetail.finalPrice / orderDetail.basketItem.quantity}
                                            originalPriceEach={
                                                orderDetail.originalPrice / orderDetail.basketItem.quantity
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="my-purchases-container-order-total">
                            <div className="my-purchases-container-order-total-price">
                                <BsShieldCheck className="my-purchases-container-order-total-price__icon" />
                                <span className="my-purchases-container-order-total-price__label">Total:</span>
                                <span className="my-purchases-container-order-total-price__price">${totalCost}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
