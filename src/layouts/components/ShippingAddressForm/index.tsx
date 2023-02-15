import { Input } from '~/components';
import { InputTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import './ShippingAddressForm.scss';

export default function ShippingAddressForm() {
    return <div className='shipping-address-form'>
        <h2 className='shipping-address-form__title'>{localizations.shippingAddress}</h2>
        <div className='shipping-address-body'>
            <div className='shipping-address-body-header'>
                <span className='shipping-address-body-header__title'>
                    {localizations.addAndEditAddress}
                </span>
            </div>
            <div className='shipping-address-inputs display-flex flex-direction--column'>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
                <div className='shipping-address-input'>
                    <label htmlFor="" className="shipping-address-input__label">
                        {localizations.author}
                    </label>
                    <Input inputType={InputTypes.ADDRESS_FORM} placeholder={localizations.searchByAuthor} />
                </div>
            </div>
        </div>
    </div>
}