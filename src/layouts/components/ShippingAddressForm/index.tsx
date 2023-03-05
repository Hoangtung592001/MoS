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
import usePlacesAutocomplete, {
    ClearSuggestions,
    getGeocode,
    getLatLng,
    SetValue,
    Status,
} from 'use-places-autocomplete';
import { GoogleMap as TypeGoogleMap } from '@react-google-maps/api';
import { RequestStatus } from '~/constants';
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
    isGoogleMapLoaded: boolean;
    setCurrentPosition: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | undefined>>;
    currentPosition: google.maps.LatLngLiteral | undefined;
    mapRef: React.MutableRefObject<TypeGoogleMap | undefined>;
    onSubmit: () => void;
    setAddressStatus: number;
    isFullnameValid: boolean;
    isAddressLineValid: boolean;
    isTelephoneValid: boolean;
    isCurrentPositionValid: boolean;
    setIsFullnameValid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAddresslineValid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsTelephoneValid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCurrentPositionValid: React.Dispatch<React.SetStateAction<boolean>>;
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

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelectPlace = async (val: string) => {
        setValue(val, false);
        clearSuggestions();

        const result = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(result[0]);
        const position: google.maps.LatLngLiteral = { lat: lat, lng: lng };
        props.setCurrentPosition(position);
        props.mapRef.current?.panTo(position);
        props.setIsCurrentPositionValid(true);
    };

    const selectPlaceItems: Array<InputDropdownItem> = data.map(({ place_id, description }) => {
        const item: InputDropdownItem = {
            id: place_id,
            value: description,
        };

        return item;
    });

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
                            isValid={props.isFullnameValid}
                            value={props.fullName}
                            onChange={(e: any) => {
                                props.setFullname(e.target.value);
                                props.setIsFullnameValid(true);
                            }}
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
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            isValid={props.isAddressLineValid}
                            value={props.addressLine}
                            onChange={(e: any) => {
                                props.setAddressline(e.target.value);
                                props.setIsAddresslineValid(true);
                            }}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.searchAddess}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputDropdown
                            handleSelect={handleSelectPlace}
                            value={value}
                            setValue={setValue}
                            selectItems={selectPlaceItems}
                            autoComplete="off"
                            disabled={!ready}
                            isValid={props.isCurrentPositionValid}
                        />
                    </div>
                    {props.isGoogleMapLoaded && (
                        <div className="shipping-address-input">
                            <GoogleMap
                                currentPosition={props.currentPosition}
                                setLength={props.setLength}
                                isGoogleMapLoaded={props.isGoogleMapLoaded}
                                setCurrentPosition={props.setCurrentPosition}
                                mapRef={props.mapRef}
                                setIsCurrentPositionValid={props.setIsCurrentPositionValid}
                            />
                        </div>
                    )}
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.telephone}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            isValid={props.isTelephoneValid}
                            value={props.telephone}
                            onChange={(e: any) => {
                                props.setTelephone(e.target.value);
                                props.setIsTelephoneValid(true);
                            }}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <div className="shipping-address-submit">
                            <Button
                                type={ButtonTypes.ADDTOBASKET}
                                onClick={props.onSubmit}
                                isLoading={props.setAddressStatus == RequestStatus.Pending}
                            >
                                <span className="shipping-address-submit__text">{localizations.shipToThisAddress}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
