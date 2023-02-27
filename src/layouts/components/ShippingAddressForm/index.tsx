import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '~/components';
import routes from '~/config/routes';
import { ButtonTypes, InputTypes, SelectTypes } from '~/constants/enums';
import { Address } from '~/constants/interfaces';
import localizations from '~/constants/locallizations';
import GoogleMap from '../GoogleMap';
import SavedAddress from '../SavedAddress';
import './ShippingAddressForm.scss';
import InputDropdown, { InputDropdownItem } from '~/components/InputDropdown';
import Select from '~/components/Select';
import { Country } from '~/redux/reducers/countryReducer';
import { SelectItem } from '~/components/Select';
import usePlacesAutocomplete, { ClearSuggestions, SetValue, Status } from 'use-places-autocomplete';
import { GoogleMap as TypeGoogleMap } from '@react-google-maps/api';
interface ShippingAddressFormProps {
    fullName: string | undefined;
    setFullname: any;
    addressLine: string | undefined;
    setAddressline: any;
    telephone: string | undefined;
    setTelephone: any;
    length: number | undefined;
    setLength: any;
    shippingFee: number | undefined;
    setShippingFee: any;
    savedAddresses: Array<Address>;
    countries: Array<Country>;
    countryId: number;
    setCountryId: React.Dispatch<React.SetStateAction<number>>;
    ready: boolean;
    value: string;
    setValue: SetValue;
    status: Status;
    data: google.maps.places.AutocompletePrediction[];
    clearSuggestions: ClearSuggestions;
    handleSelectPlace: (val: string) => Promise<void>;
    selectPlaceItems: Array<InputDropdownItem>;
    isGoogleMapLoaded: boolean;
    setCurrentPosition: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | undefined>>;
    currentPosition: google.maps.LatLngLiteral | undefined;
    mapRef: React.MutableRefObject<TypeGoogleMap | undefined>;
    onSubmit: () => void;
}

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
    const navite = useNavigate();

    const convertedCountries = props.countries.map((country) => {
        const selectItem: SelectItem = {
            id: country.id,
            value: country.countryName,
        };

        return selectItem;
    });

    const onUse = useCallback((addressId: string) => {
        navite(routes.paymentOptions, {
            state: {
                addressId: addressId,
            },
        });
    }, []);

    return (
        <div className="shipping-address-form">
            <h2 className="shipping-address-form__title">{localizations.shippingAddress}</h2>
            {props.savedAddresses.length > 0 && (
                <>
                    <h3 className="shipping-address-form__saved-address-title">Saved Address</h3>
                    <div className="shipping-address-form-saved-address">
                        <SavedAddress savedAddresses={props.savedAddresses} onUse={onUse} />
                    </div>
                </>
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
                        <Select
                            label={localizations.country}
                            isRequired={true}
                            selectType={SelectTypes.ADDRESS_FORM}
                            items={convertedCountries}
                            value={props.countryId}
                            onChange={(e: any) => {
                                props.setCountryId(e.target.value);
                            }}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.addressLine}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputDropdown
                            handleSelect={props.handleSelectPlace}
                            value={props.value}
                            setValue={props.setValue}
                            selectItems={props.selectPlaceItems}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <GoogleMap
                            currentPosition={props.currentPosition}
                            setLength={props.setLength}
                            isGoogleMapLoaded={props.isGoogleMapLoaded}
                            setCurrentPosition={props.setCurrentPosition}
                            mapRef={props.mapRef}
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
                            <Button type={ButtonTypes.ADDTOBASKET} onClick={props.onSubmit}>
                                <span className="shipping-address-submit__text">{localizations.shipToThisAddress}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
