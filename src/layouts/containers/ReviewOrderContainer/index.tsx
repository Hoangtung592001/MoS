import { Fragment, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { bindActionCreators } from 'redux';
import { checkTokenExpiry, convertConcurrency, getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { Button, Input, TextLink } from '~/components';
import routes, { getBookDetailsRoute } from '~/config/routes';
import { CashPaymentOptionId, RequestStatus } from '~/constants';
import { InputTypes, TextLinkTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { useAppDispatch, useAppSelector } from '~/hooks';
import VisaReview from '~/layouts/components/VisaReview';
import ShippingAddressReview from '~/layouts/components/ShippingAddressReview';
import actionCreators from '~/redux';
import { SetOrderReq } from '~/redux/action-creators/orderActionCreator';
import './ReviewOrderContainer.scss';
import CashReview from '~/layouts/components/CashReview';
import DefaultValueInput from '~/components/DefaultValueInput';
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
    const [securityCode, setSecurityCode] = useState<string>('');
    const [IsSecurityCodeValid, setIsSecurityCodeValid] = useState<boolean>(true);

    useEffect(() => {
        if (status == RequestStatus.Fulfilled && newOrderId) {
            resetOrder();
            navigate(routes.congratulations, {
                state: {
                    orderId: newOrderId,
                },
            });
        }
    }, [status, newOrderId]);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.home);
        } else {
            const tokenExpire = checkTokenExpiry(accessToken);
            if (tokenExpire) navigate(routes.signin);
        }
        if (!addressId || !paymentOptionId) {
            navigate(routes.basket);
        }
    }, []);

    useEffect(() => {
        if (addressId && paymentOptionId) {
            getAddressById(accessToken, addressId);
            if (paymentOptionId !== CashPaymentOptionId) {
                getPaymentOptionById(accessToken, paymentOptionId);
            }
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
                {currentAddress && (currentPaymentOption || paymentOptionId === CashPaymentOptionId) && (
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
                            {paymentOptionId === CashPaymentOptionId ? (
                                <CashReview title={localizations.paymentInfo} />
                            ) : (
                                currentPaymentOption && 
                                <VisaReview
                                    title={localizations.paymentInfo}
                                    creditCardNumber={currentPaymentOption.cardNumber}
                                    cardDescription={currentPaymentOption.paymentOptionTypeDescription.name}
                                    expirtaionDate={currentPaymentOption.expiryDate}
                                    securityCode={securityCode}
                                    setSecurityCode={setSecurityCode}
                                    IsSecurityCodeValid={IsSecurityCodeValid}
                                    setIsSecurityCodeValid={setIsSecurityCodeValid}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="review-order-container-basket">
                {/* <div className="basket">
                    <table className="basket-table">
                        <thead className="basket-table-row basket-table-row-header">
                            <tr className="basket-table-row__item1">
                                <td className="basket-table-row__item1">
                                    {localizations.itemSummary} ({basket.basketItems.length} {localizations.items})
                                </td>
                            </tr>
                            <tr className="basket-table-row__item2">
                                <td>
                                    {localizations.price}
                                </td>
                            </tr>
                            <tr className="basket-table-row__item3">
                                <td>
                                    {localizations.quantity}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {basket.basketItems.map((item, index) => {
                                return (
                                    <>
                                        <tr className="basket-table-row-container" key={item.bookId}>
                                            <td className="basket-table-row">
                                                <div className="basket-table-row__item1 basket-table-row-item display-flex">
                                                    <div className="basket-table-row-info display-flex flex-direction--column">
                                                        <TextLink
                                                            type={TextLinkTypes.BLUE}
                                                            to={getBookDetailsRoute(item.book.id)}
                                                        >
                                                            <span className="basket-table-row-info__title">
                                                                {item.book.title}
                                                            </span>
                                                        </TextLink>
                                                        <span className="basket-table-row-info__author">
                                                            {item.book.author.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="basket-table-row__item2 basket-table-row-price">
                                                    <span className="basket-table-row-price__each">
                                                        US$ {item.book.price}
                                                    </span>
                                                </div>
                                                <div className="basket-table-row__item3 basket-table-row-quantity">
                                                    <div className="basket-table-row-quantity-container display-flex align-items--center">
                                                        <Input
                                                            inputType={InputTypes.QUANTITY}
                                                            value={item.book.quantity}
                                                            disabled
                                                        />
                                                        <span>{`(of 1)`}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="basket-table-row-payment">
                                            <td className="basket-table-row">
                                                <div className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                                                    <span className="basket-table-row-shipping__text--sub-total basket-table-row-shipping__text">
                                                        {localizations.subTotal}
                                                    </span>
                                                </div>
                                                <div className="basket-table-row__item2 basket-table-row-price">
                                                    <span className="basket-table-row-price__total--sub-total basket-table-row-shipping__text">
                                                        US$ {Math.round(item.book.price * item.book.quantity * 100) / 100}
                                                    </span>
                                                </div>
                                                <div className="basket-table-row__item3"></div>
                                                <div className="basket-table-row__item4"></div>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
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
                                    US ${Math.round((shippingFee + basket?.orderTotal) * 100) / 100}
                                </span>
                            </div>
                        </div>
                        <div className="basket-total-button">
                            <Button
                                onClick={(e: any) => {
                                    if (!securityCode && paymentOptionId !== CashPaymentOptionId ) {
                                        setIsSecurityCodeValid(false);
                                    } else {
                                        const basketItemIDs = basket.basketItems.map((basketItem) => {
                                            return basketItem.id;
                                        });

                                        onSubmit(basketItemIDs, addressId, paymentOptionId, accessToken);
                                    }
                                }}
                                isLoading={status == RequestStatus.Pending}
                            >
                                <span>Place Order Now</span>
                            </Button>
                        </div>
                    </div>
                </div> */}
                <div className="basket">
                <table className="basket-table">
                    <thead className="basket-table-row basket-table-row-header">
                        <tr className="basket-table-row__item1">
                            <td>
                                {localizations.basketItems} ({basket.basketItems.length}
                                {localizations.items})
                            </td>
                        </tr>
                        <tr className="basket-table-row__item2">
                            <td>
                                {localizations.price}
                            </td>
                        </tr>
                        <tr className="basket-table-row__item3">
                            <td>
                                {localizations.quantity}
                            </td>
                        </tr>
                        <tr className="basket-table-row__item4"></tr>
                    </thead>
                    {basket.basketItems.length == 0 ? (
                        <tbody>
                            <tr>
                                <td>
                                    <p className="basket-table__empty-message">{localizations.emptyBasket}</p>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <Fragment>
                            {basket.basketItems.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <tbody className="basket-table-row basket-table-row-container">
                                            <tr className="basket-table-row__item1 basket-table-row-item display-flex">
                                                <td className='basket-table-row__item1 basket-table-row-item display-flex'>
                                                    <img src={item.book.bookImage.url} alt="Books" />
                                                    <div className="basket-table-row-info display-flex flex-direction--column">
                                                        <div>
                                                            <TextLink
                                                                type={TextLinkTypes.BLUE}
                                                                to={getBookDetailsRoute(item.book.id)}
                                                            >
                                                                <span className="basket-table-row-info__title">
                                                                    {item.book.title}
                                                                </span>
                                                            </TextLink>
                                                            {
                                                                !item.isQuantityValid &&
                                                                <span className='basket-table-row-info__error'>
                                                                    {
                                                                        `(${localizations.exceededError})`
                                                                    }
                                                                </span>
                                                            }
                                                        </div>
                                                        <span className="basket-table-row-info__author">
                                                            {item.book.author.name}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="basket-table-row__item2 basket-table-row-price">
                                                <td>
                                                    <span className="basket-table-row-price__each">
                                                        US$ {item.book.price}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="basket-table-row__item3 basket-table-row-quantity">
                                                <td>
                                                    <div className="basket-table-row-quantity-container display-flex align-items--center">
                                                        <DefaultValueInput
                                                            defaultValue={item.book.quantity}
                                                            type="number"
                                                            itemId={item.id}
                                                            disabled={true}
                                                        />
                                                        <span>{`(of 1)`}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="basket-table-row__item4 display-flex justify-content--right">
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody className="basket-table-row basket-table-row-payment">
                                            <tr className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                                                <td>
                                                    <span className="basket-table-row-shipping__text--sub-total basket-table-row-shipping__text">
                                                        {localizations.subTotal}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="basket-table-row__item2 basket-table-row-price">
                                                <td>
                                                    <span className="basket-table-row-price__total--sub-total basket-table-row-shipping__text">
                                                        US$ {convertConcurrency(item.book.price * item.book.quantity)}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="basket-table-row__item3"></tr>
                                            <tr className="basket-table-row__item4"></tr>
                                        </tbody>
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    )}
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
                                    US ${Math.round((shippingFee + basket?.orderTotal) * 100) / 100}
                                </span>
                            </div>
                        </div>
                        <div className="basket-total-button">
                            <Button
                                onClick={(e: any) => {
                                    if (!securityCode && paymentOptionId !== CashPaymentOptionId) {
                                        setIsSecurityCodeValid(false);
                                    } else {
                                        const basketItemIDs = basket.basketItems.map((basketItem) => {
                                            return basketItem.id;
                                        });

                                        onSubmit(basketItemIDs, addressId, paymentOptionId, accessToken);
                                    }
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
