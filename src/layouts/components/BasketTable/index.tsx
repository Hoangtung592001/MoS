import localizations from '~/constants/locallizations';
import './BasketTable.scss';
import { TextLink, Input, Button } from '~/components';
import { TextLinkTypes, ButtonTypes, InputTypes } from '~/constants/enums';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks';
import { useEffect } from 'react';
import routes from '~/config/routes';
export default function BasketTable() {
    const naviate = useNavigate();
    const { accessToken } = useAppSelector(state => state.user.token);
    
    useEffect(() => {
        if (!accessToken) {
            naviate(routes.signin);
        }
    }, []);

    return (
        <table className="basket-table">
            <tr className="basket-table-row basket-table-row-header">
                <th className="basket-table-row__item1">
                    {localizations.basketItems} (2 {localizations.items})
                </th>
                <th className="basket-table-row__item2">{localizations.price}</th>
                <th className="basket-table-row__item3">{localizations.quantity}</th>
                <th className="basket-table-row__item4"></th>
            </tr>
            <div className='basket-table-row-container'>
                <tr className="basket-table-row">
                    <td className="basket-table-row__item1 basket-table-row-item display-flex">
                        <img src="https://pictures.abebooks.com/isbn/9781411423411-us-300.jpg" alt="Books" />
                        <div className='basket-table-row-info display-flex flex-direction--column'>
                            <TextLink type={TextLinkTypes.BLUE}>
                                <span className='basket-table-row-info__title'>
                                    How to Write a Research Paper [Paperback] sparknotes-editors
                                </span>
                            </TextLink>
                            <span className='basket-table-row-info__author'>
                                UNITED STATES NAVAL ACADEMY
                            </span>
                        </div>
                    </td>
                    <td className="basket-table-row__item2 basket-table-row-price">
                        <span className='basket-table-row-price__each'>
                            US$ 60.53
                        </span>
                    </td>
                    <td className="basket-table-row__item3 basket-table-row-quantity">
                        <div className='basket-table-row-quantity-container display-flex align-items--center'>
                            <Input inputType={InputTypes.QUANTITY}/>
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
                            US$ 60.53
                        </span>
                    </td>
                    <td className="basket-table-row__item3"></td>
                    <td className="basket-table-row__item4"></td>
                </tr>
            </div>
            <div className='basket-table-row-payment--sub-total basket-table-row-payment'>
                <tr className="basket-table-row">
                    <td className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                        <span className='basket-table-row-shipping__text--sub-total basket-table-row-shipping__text'>
                            {localizations.subTotal}
                        </span>
                    </td>
                    <td className="basket-table-row__item2 basket-table-row-price">
                        <span className='basket-table-row-price__total--sub-total basket-table-row-shipping__text'>
                            US$ 60.53
                        </span>
                    </td>
                    <td className="basket-table-row__item3"></td>
                    <td className="basket-table-row__item4"></td>
                </tr>
            </div>
            {/*  */}
            <div className='basket-table-row-container'>
                <tr className="basket-table-row">
                    <td className="basket-table-row__item1 basket-table-row-item display-flex">
                        <img src="https://pictures.abebooks.com/isbn/9781411423411-us-300.jpg" alt="Books" />
                        <div className='basket-table-row-info display-flex flex-direction--column'>
                            <TextLink type={TextLinkTypes.BLUE}>
                                <span className='basket-table-row-info__title'>
                                    How to Write a Research Paper [Paperback] sparknotes-editors
                                </span>
                            </TextLink>
                            <span className='basket-table-row-info__author'>
                                UNITED STATES NAVAL ACADEMY
                            </span>
                        </div>
                    </td>
                    <td className="basket-table-row__item2 basket-table-row-price">
                        <span className='basket-table-row-price__each'>
                            US$ 60.53
                        </span>
                    </td>
                    <td className="basket-table-row__item3 basket-table-row-quantity">
                        <div className='basket-table-row-quantity-container display-flex align-items--center'>
                            <Input inputType={InputTypes.QUANTITY}/>
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
                            US$ 60.53
                        </span>
                    </td>
                    <td className="basket-table-row__item3"></td>
                    <td className="basket-table-row__item4"></td>
                </tr>
            </div>
            <div className='basket-table-row-payment'>
                <tr className="basket-table-row">
                    <td className="basket-table-row__item1 basket-table-row-shipping display-flex justify-content--right">
                        <span className='basket-table-row-shipping__text--sub-total basket-table-row-shipping__text'>
                            {localizations.subTotal}
                        </span>
                    </td>
                    <td className="basket-table-row__item2 basket-table-row-price">
                        <span className='basket-table-row-price__total--sub-total basket-table-row-shipping__text'>
                            US$ 60.53
                        </span>
                    </td>
                    <td className="basket-table-row__item3"></td>
                    <td className="basket-table-row__item4"></td>
                </tr>
            </div>
        </table>
    );
}
