import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { bindActionCreators } from 'redux';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { Button, Input, TextLink } from '~/components';
import routes from '~/config/routes';
import { RequestStatus } from '~/constants';
import { InputTypes, TextLinkTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { useAppDispatch, useAppSelector } from '~/hooks';
import VisaReview from '~/layouts/components/VisaReview';
import ShippingAddressReview from '~/layouts/components/ShippingAddressReview';
import actionCreators from '~/redux';
import { SetOrderReq } from '~/redux/action-creators/orderActionCreator';
import './ReviewOrderContainer.scss';
export default function ReviewOrderContainer() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const accessToken = getAccessTokenFromCookies();
    const navigate = useNavigate();
    const addressId = location.state?.addressId;
    const paymentOptionId = location.state?.paymentOptionId;
    const { getAddressById, getPaymentOptionById } = bindActionCreators(actionCreators, dispatch);
    const { currentAddress } = useAppSelector((state) => state.addressReducer);
    const { currentPaymentOption } = useAppSelector((state) => state.paymenOptionsReducer);
    const { shippingFee } = useAppSelector((state) => state.shippingReducer);
    const { getBasket, getShippingFee, setOrder, resetOrder } = bindActionCreators(actionCreators, dispatch);
    const basket = useAppSelector((state) => state.basketReducer.basket);
    const { status, newOrderId } = useAppSelector((state) => state.orderReducer);

    useEffect(() => {
        if (status == RequestStatus.Fulfilled && newOrderId) {
            resetOrder();
            navigate(routes.home);
        }
    }, [status, newOrderId]);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.home);
        }
        if (!addressId || !paymentOptionId) {
            navigate(routes.basket);
        }
    }, []);

    useEffect(() => {
        if (addressId && paymentOptionId) {
            getAddressById(accessToken, addressId);
            getPaymentOptionById(accessToken, paymentOptionId);
            getBasket(accessToken);
            getShippingFee(accessToken, addressId);
        }
    }, []);

    const onSubmit = useCallback(
        (basketItemIDs: Array<string>, addressId: string, paymentOptionId: string, accessToken: string) => {
            const setOrderReq: SetOrderReq = {
                basketItemIDs: basketItemIDs,
                addressId: addressId,
                paymentOptionId: paymentOptionId,
                accessToken: accessToken,
            };
            setOrder(setOrderReq);
        },
        [],
    );

    return (
        <div className="review-order-container">
            <h3>Order Summary</h3>
            <div className="review-order-info display-flex justify-content--space-between">
                {currentAddress && currentPaymentOption && (
                    <>
                        <div className="review-order-info-address">
                            <ShippingAddressReview
                                title={localizations.shippingAddress}
                                fullName={currentAddress.fullName}
                                addressLine={currentAddress.addressLine}
                                country="Viet Nam"
                            />
                        </div>
                        <div className="review-order-info-payment">
                            <VisaReview
                                title={localizations.paymentInfo}
                                creditCardNumber={currentPaymentOption.cardNumber}
                                cardDescription={currentPaymentOption.paymentOptionTypeDescription.name}
                                expirtaionDate={currentPaymentOption.expiryDate}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="review-order-container-basket">
                <div className="basket">
                    <table className="basket-table">
                        <tr className="basket-table-row basket-table-row-header">
                            <th className="basket-table-row__item1">
                                {localizations.itemSummary} ({basket.basketItems.length} {localizations.items})
                            </th>
                            <th className="basket-table-row__item2">{localizations.price}</th>
                            <th className="basket-table-row__item3">{localizations.quantity}</th>
                        </tr>
                        {basket.basketItems.map((item) => {
                            return (
                                <>
                                    <div className="basket-table-row-container">
                                        <tr className="basket-table-row">
                                            <td className="basket-table-row__item1 basket-table-row-item display-flex">
                                                <div className="basket-table-row-info display-flex flex-direction--column">
                                                    <TextLink type={TextLinkTypes.BLUE}>
                                                        <span className="basket-table-row-info__title">
                                                            {item.book.title}
                                                        </span>
                                                    </TextLink>
                                                    <span className="basket-table-row-info__author">
                                                        {item.book.author.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="basket-table-row__item2 basket-table-row-price">
                                                <span className="basket-table-row-price__each">
                                                    US$ {item.book.price}
                                                </span>
                                            </td>
                                            <td className="basket-table-row__item3 basket-table-row-quantity">
                                                <div className="basket-table-row-quantity-container display-flex align-items--center">
                                                    <Input
                                                        inputType={InputTypes.QUANTITY}
                                                        value={item.book.quantity}
                                                        disabled
                                                    />
                                                    <span>{`(of 1)`}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </div>
                                    <div className="basket-table-row-payment">
                                        <tr className="basket-table-row">
                                            <td className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                                                <span className="basket-table-row-shipping__text--sub-total basket-table-row-shipping__text">
                                                    {localizations.subTotal}
                                                </span>
                                            </td>
                                            <td className="basket-table-row__item2 basket-table-row-price">
                                                <span className="basket-table-row-price__total--sub-total basket-table-row-shipping__text">
                                                    US$ {Math.round(item.book.price * item.book.quantity * 100) / 100}
                                                </span>
                                            </td>
                                            <td className="basket-table-row__item3"></td>
                                            <td className="basket-table-row__item4"></td>
                                        </tr>
                                    </div>
                                </>
                            );
                        })}
                    </table>
                    <div className="basket-total display-flex justify-content--space-between">
                        <div className="basket-total-button basket-total-button--first display-flex">
                            <div></div>
                            <div className="basket-total-total">
                                <span className="basket-total-total__message">Order Total:</span>
                                <span className="basket-total-total__price">US ${basket?.orderTotal}</span>
                            </div>
                        </div>
                        <div className="basket-total-button"></div>
                    </div>
                    <div className="basket-total basket-total--small-margin display-flex justify-content--space-between">
                        <div className="basket-total-button basket-total-button--first display-flex">
                            <div></div>
                            <div className="basket-total-total">
                                <span className="basket-total-total__message">Shipping Fee:</span>
                                <span className="basket-total-total__price">US ${shippingFee}</span>
                            </div>
                        </div>
                        <div className="basket-total-button"></div>
                    </div>
                    <div className="basket-total basket-total--small-margin display-flex justify-content--space-between">
                        <div className="basket-total-button basket-total-button--first display-flex">
                            <div></div>
                            <div className="basket-total-total">
                                <span className="basket-total-total__message">Total:</span>
                                <span className="basket-total-total__price">
                                    US ${shippingFee + basket?.orderTotal}
                                </span>
                            </div>
                        </div>
                        <div className="basket-total-button">
                            <Button
                                onClick={(e: any) => {
                                    const basketItemIDs = basket.basketItems.map((basketItem) => {
                                        return basketItem.id;
                                    });

                                    onSubmit(basketItemIDs, addressId, paymentOptionId, accessToken);
                                }}
                                isLoading={status == RequestStatus.Pending}
                            >
                                <span>Place Order Now</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
