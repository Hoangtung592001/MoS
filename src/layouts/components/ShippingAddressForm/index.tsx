import { Button, Input } from '~/components';
import { ButtonTypes, InputTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import GoogleMap from '../GoogleMap';
import './ShippingAddressForm.scss';

export default function ShippingAddressForm() {
    return (
        <div className="shipping-address-form">
            <h2 className="shipping-address-form__title">{localizations.shippingAddress}</h2>
            <div className="shipping-address-body">
                <div className="shipping-address-body-header">
                    <span className="shipping-address-body-header__title">{localizations.addAndEditAddress}</span>
                </div>
                <div className="shipping-address-inputs display-flex flex-direction--column">
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.fullName}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.addressLine1}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.addressLine2}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <GoogleMap />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.country}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.zipAndPostCode}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.city}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.telephone}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input inputType={InputTypes.ADDRESS_FORM} />
                    </div>
                    <div className="shipping-address-input">
                        <div className="shipping-address-submit">
                            <Button type={ButtonTypes.ADDTOBASKET}>
                                <span className="shipping-address-submit__text">{localizations.shipToThisAddress}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
