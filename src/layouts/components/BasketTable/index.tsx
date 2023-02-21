import localizations from '~/constants/locallizations';
import './BasketTable.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks';
import { useEffect } from 'react';
import routes from '~/config/routes';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { ButtonTypes, InputTypes, TextLinkTypes } from '~/constants/enums';
import { Button, ButtonLink, Input, TextLink } from '~/components';
import { Fragment } from 'react';
import Cookies from 'universal-cookie';
import { accessTokenKey } from '~/constants';

export default function BasketTable() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getBasket } = bindActionCreators(actionCreators, dispatch);
    const accessToken = cookies.get(accessTokenKey);
    const basket = useAppSelector(state => state.basketReducer.basket);
    
    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        }
        else {
            getBasket(accessToken);
        }
    }, []);

    return (
        <div className='basket'>
            <table className="basket-table">
                <tr className="basket-table-row basket-table-row-header">
                    <th className="basket-table-row__item1">
                        {localizations.basketItems} ({basket.basketItems.length} {localizations.items})
                    </th>
                    <th className="basket-table-row__item2">{localizations.price}</th>
                    <th className="basket-table-row__item3">{localizations.quantity}</th>
                    <th className="basket-table-row__item4"></th>
                </tr>
                {
                    basket.basketItems.length == 0 ?
                    <div>
                        <p className='basket-table__empty-message'>
                            {localizations.emptyBasket}
                        </p>
                    </div>
                    :
                            <Fragment>
                                {
                                    basket.basketItems.map(item => {
                                        return (
                                            <Fragment>
                                                <div className='basket-table-row-container'>
                                                    <tr className="basket-table-row">
                                                        <td className="basket-table-row__item1 basket-table-row-item display-flex">
                                                            <img src={item.book.bookImage.url} alt="Books" />
                                                            <div className='basket-table-row-info display-flex flex-direction--column'>
                                                                <TextLink type={TextLinkTypes.BLUE}>
                                                                    <span className='basket-table-row-info__title'>
                                                                        {item.book.title}
                                                                    </span>
                                                                </TextLink>
                                                                <span className='basket-table-row-info__author'>
                                                                    {item.book.author.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="basket-table-row__item2 basket-table-row-price">
                                                            <span className='basket-table-row-price__each'>
                                                                US$ {item.book.price}
                                                            </span>
                                                        </td>
                                                        <td className="basket-table-row__item3 basket-table-row-quantity">
                                                            <div className='basket-table-row-quantity-container display-flex align-items--center'>
                                                                <Input inputType={InputTypes.QUANTITY} value={item.book.quantity}/>
                                                                <span>{`(of 1)`}</span>
                                                            </div>
                                                        </td>
                                                        <td className="basket-table-row__item4 display-flex justify-content--right">
                                                            <Button type={ButtonTypes.REMOVE}>
                                                                {localizations.remove}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                </div>
                                                <div className='basket-table-row-payment'>
                                                    <tr className="basket-table-row">
                                                        <td className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                                                            <span className='basket-table-row-shipping__text'>
                                                                {localizations.shipping}
                                                            </span>
                                                        </td>
                                                        <td className="basket-table-row__item2 basket-table-row-price">
                                                            <span className='basket-table-row-price__total'>
                                                                US$ 9.99
                                                            </span>
                                                        </td>
                                                        <td className="basket-table-row__item3"></td>
                                                        <td className="basket-table-row__item4"></td>
                                                    </tr>
                                                </div>
                                                <div className='basket-table-row-payment'>
                                                    {/* basket-table-row-payment if it is the last row. Otherwise, 
                                                    basket-table-row-payment--sub-total basket-table-row-payment */}
                                                    <tr className="basket-table-row">
                                                        <td className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                                                            <span className='basket-table-row-shipping__text--sub-total basket-table-row-shipping__text'>
                                                                {localizations.subTotal}
                                                            </span>
                                                        </td>
                                                        <td className="basket-table-row__item2 basket-table-row-price">
                                                            <span className='basket-table-row-price__total--sub-total basket-table-row-shipping__text'>
                                                                US$ {Math.round((item.book.price + 9.99) * 100 ) / 100}
                                                            </span>
                                                        </td>
                                                        <td className="basket-table-row__item3"></td>
                                                        <td className="basket-table-row__item4"></td>
                                                    </tr>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </Fragment>
                        
                }
            </table>
            <div className='basket-total display-flex justify-content--space-between'>
                <div className='basket-total-button basket-total-button--first display-flex'>
                    <ButtonLink to={routes.home}>
                        <span>
                            AbeBooks Home
                        </span>
                    </ButtonLink>
                    <div className='basket-total-total'>
                        <span className='basket-total-total__message'>
                            Order Total:
                        </span>
                        <span className='basket-total-total__price'>
                            US ${basket?.orderTotal}
                        </span>
                    </div>
                </div>
                <div className='basket-total-button'>
                    <ButtonLink to={routes.shippingAddress}>
                        <span>
                            Proceed to Checkout
                        </span>
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
}
