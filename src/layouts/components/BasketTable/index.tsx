import localizations from '~/constants/locallizations';
import './BasketTable.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks';
import { useCallback, useEffect } from 'react';
import routes from '~/config/routes';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { ButtonTypes, InputTypes, TextLinkTypes } from '~/constants/enums';
import { Button, ButtonLink, Input, TextLink } from '~/components';
import { Fragment } from 'react';
import Cookies from 'universal-cookie';
import { accessTokenKey, RequestStatus } from '~/constants';
import { useState } from 'react';
import Modal from '../Modal';
import { Basket, RemoveItem, resetBasket } from '~/redux/action-creators/basketActionCreator';
import jwt_decode from 'jwt-decode';
import { checkTokenExpiry } from '~/commons/commonUsedFunctions';

export type BookItem = {
    id: string;
    quantity: number;
};

export default function BasketTable() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getBasket, removeItemFromBasket, resetBasket } = bindActionCreators(actionCreators, dispatch);
    const accessToken = cookies.get(accessTokenKey);
    const { basket, removeItemStatus } = useAppSelector((state) => state.basketReducer);

    const onProceedToCheckout = useCallback((basket: Basket) => {
        navigate(routes.shippingAddress);
    }, []);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        } else {
            const tokenExpire = checkTokenExpiry(accessToken);
            if (tokenExpire) {
                navigate(routes.signin);
            } else {
                getBasket(accessToken);
            }
        }
    }, []);

    useEffect(() => {
        if (removeItemStatus == RequestStatus.Fulfilled) {
            resetBasket();
            window.location.reload();
        }
    }, [removeItemFromBasket]);

    return (
        <>
            <div className="basket">
                <table className="basket-table">
                    <thead className="basket-table-row basket-table-row-header">
                        <tr className="basket-table-row__item1">
                            {localizations.basketItems} ({basket.basketItems.length}
                            {localizations.items})
                        </tr>
                        <tr className="basket-table-row__item2">{localizations.price}</tr>
                        <tr className="basket-table-row__item3">{localizations.quantity}</tr>
                        <tr className="basket-table-row__item4"></tr>
                    </thead>
                    {basket.basketItems.length == 0 ? (
                        <tbody>
                            <p className="basket-table__empty-message">{localizations.emptyBasket}</p>
                        </tbody>
                    ) : (
                        <Fragment>
                            {basket.basketItems.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        {/* <div className="basket-table-row-container"> */}
                                        <tbody className="basket-table-row basket-table-row-container">
                                            <tr className="basket-table-row__item1 basket-table-row-item display-flex">
                                                <img src={item.book.bookImage.url} alt="Books" />
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
                                            </tr>
                                            <tr className="basket-table-row__item2 basket-table-row-price">
                                                <span className="basket-table-row-price__each">
                                                    US$ {item.book.price}
                                                </span>
                                            </tr>
                                            <tr className="basket-table-row__item3 basket-table-row-quantity">
                                                <div className="basket-table-row-quantity-container display-flex align-items--center">
                                                    <Input inputType={InputTypes.QUANTITY} value={item.book.quantity} />
                                                    <span>{`(of 1)`}</span>
                                                </div>
                                            </tr>
                                            <tr className="basket-table-row__item4 display-flex justify-content--right">
                                                <Button
                                                    type={ButtonTypes.REMOVE}
                                                    onClick={(e: any) => {
                                                        const removeItemProps: RemoveItem = {
                                                            accessToken: accessToken,
                                                            basketItemId: item.id,
                                                        };
                                                        removeItemFromBasket(removeItemProps);
                                                    }}
                                                    isLoading={removeItemStatus == RequestStatus.Pending}
                                                >
                                                    {localizations.remove}
                                                </Button>
                                            </tr>
                                        </tbody>
                                        {/* </div> */}
                                        {/* <div className="basket-table-row-payment"> */}
                                        <tbody className="basket-table-row basket-table-row-payment">
                                            <tr className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                                                <span className="basket-table-row-shipping__text--sub-total basket-table-row-shipping__text">
                                                    {localizations.subTotal}
                                                </span>
                                            </tr>
                                            <tr className="basket-table-row__item2 basket-table-row-price">
                                                <span className="basket-table-row-price__total--sub-total basket-table-row-shipping__text">
                                                    US$ {item.book.price}
                                                </span>
                                            </tr>
                                            <tr className="basket-table-row__item3"></tr>
                                            <tr className="basket-table-row__item4"></tr>
                                        </tbody>
                                        {/* </div> */}
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    )}
                </table>
                <div className="basket-total display-flex justify-content--space-between">
                    <div className="basket-total-button basket-total-button--first display-flex">
                        <Button
                            onClick={(e: any) => {
                                navigate(routes.home);
                            }}
                        >
                            <span>AbeBooks Home</span>
                        </Button>
                        <div className="basket-total-total">
                            <span className="basket-total-total__message">Order Total:</span>
                            <span className="basket-total-total__price">US ${basket?.orderTotal}</span>
                        </div>
                    </div>
                    <div className="basket-total-button">
                        {basket.basketItems.length > 0 && (
                            <Button
                                onClick={(e: any) => {
                                    onProceedToCheckout(basket);
                                }}
                            >
                                <span>Proceed to Checkout</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
