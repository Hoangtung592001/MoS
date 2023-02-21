import { Button, Input } from '~/components';
import { ButtonTypes, InputTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import GoogleMap from '../GoogleMap';
import './ShippingAddressForm.scss';

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
}

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
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
