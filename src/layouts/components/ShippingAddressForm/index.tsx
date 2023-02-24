import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '~/components';
import routes from '~/config/routes';
import { ButtonTypes, InputTypes } from '~/constants/enums';
import { Address } from '~/constants/interfaces';
import localizations from '~/constants/locallizations';
import { BookItem } from '../BasketTable';
import GoogleMap from '../GoogleMap';
import SavedAddress from '../SavedAddress';
import './ShippingAddressForm.scss';
import { SpinnerCircularFixed } from 'spinners-react';
import InputDropdown from '~/components/InputDropdown';

interface ShippingAddressFormProps {
    fullName: string | undefined;
    setFullname: any;
    addressLine: string | undefined;
    setAddressline: any;
    telephone: string | undefined;
    setTelephone: any;
    length: number | undefined;
    setLength: any;
    longitude: number | undefined;
    setLongitude: any;
    latitude: number | undefined;
    setLatitude: any;
    shippingFee: number | undefined;
    setShippingFee: any;
    savedAddresses: Array<Address>;
    bookItems: Array<BookItem>;
}

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
    const navite = useNavigate();

    const onSubmit = useCallback((addressId: string) => {
        navite(routes.paymentOptions);
    }, []);

    const onUse = useCallback((addressId: string) => {
        navite(routes.paymentOptions, {
            state: {
                addressId: addressId,
                bookItems: props.bookItems,
            },
        });
    }, []);
    return (
        <div className="shipping-address-form">
            <h2 className="shipping-address-form__title">{localizations.shippingAddress}</h2>
            <h3 className="shipping-address-form__saved-address-title">Saved Address</h3>
            {props.savedAddresses.length > 0 && (
                <div className="shipping-address-form-saved-address">
                    <SavedAddress savedAddresses={props.savedAddresses} onUse={onUse} />
                </div>
            )}
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
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={props.fullName}
                            onChange={(e: any) => props.setFullname(e.target.value)}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.addressLine}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={props.addressLine}
                            onChange={(e: any) => props.setAddressline(e.target.value)}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.addressLine}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputDropdown />
                    </div>
                    <div className="shipping-address-input">
                        <GoogleMap
                            setLongitude={props.setLongitude}
                            setLatitude={props.setLatitude}
                            setLength={props.setLength}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.telephone}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={props.telephone}
                            onChange={(e: any) => props.setTelephone(e.target.value)}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <div className="shipping-address-submit">
                            <Button type={ButtonTypes.ADDTOBASKET} onClick={onSubmit}>
                                <span className="shipping-address-submit__text">{localizations.shipToThisAddress}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
