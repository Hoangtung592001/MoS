import './ShippingAddressContainer.scss';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { ShippingAddressForm } from '~/layouts/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { accessTokenKey, RequestStatus, VietNamId } from '~/constants';
import routes from '~/config/routes';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { InputDropdownItem } from '~/components/InputDropdown';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { SetAddressReq } from '~/redux/action-creators/addressActionCreator';
export default function ShippingAddressContainer() {
    const mapRef = useRef<GoogleMap>();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    const [fullName, setFullname] = useState<string>();
    const [addressLine, setAddressline] = useState<string>();
    const [telephone, setTelephone] = useState<string>();
    const [length, setLength] = useState<number>();
    const [shippingFee, setShippingFee] = useState<number>();
    const [countryId, setCountryId] = useState<number>(VietNamId);
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral>();
    const dispatch = useAppDispatch();
    const { getSavedAddress, getCountries, resetAddress } = bindActionCreators(actionCreators, dispatch);
    const savedAddresses = useAppSelector((state) => state.addressReducer.savedAddresses);
    const countries = useAppSelector((state) => state.countryReducer.countries);
    const { setAddress } = bindActionCreators(actionCreators, dispatch);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDI67HKJfI0oeNGqvdX6VNW5_1Fq2wq9jQ',
        libraries: ['places'],
    });

    const addressReducerState = useAppSelector((state) => state.addressReducer);

    const onNavigate = useCallback((addressId: string) => {
        navigate(routes.paymentOptions, {
            state: {
                addressId: addressId,
            },
        });
    }, []);

    useEffect(() => {
        if (addressReducerState.status == RequestStatus.Fulfilled && addressReducerState.newAddressId) {
            resetAddress();
            onNavigate(addressReducerState.newAddressId);
        }
    }, [addressReducerState]);

    useEffect(() => {
        getSavedAddress(accessToken);
        getCountries();
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
        setCurrentPosition(position);
        mapRef.current?.panTo(position);
    };

    const selectPlaceItems: Array<InputDropdownItem> = data.map(({ place_id, description }) => {
        const item: InputDropdownItem = {
            id: place_id,
            value: description,
        };

        return item;
    });

    const onSubmit = () => {
        if (fullName && addressLine && telephone && currentPosition && length && countryId && accessToken) {
            const setAddressReq: SetAddressReq = {
                fullName: fullName,
                addressLine: addressLine,
                telephone: telephone,
                longitude: currentPosition.lng,
                latitude: currentPosition.lat,
                distance: length,
                countryId: countryId,
                accessToken: accessToken,
            };

            setAddress(setAddressReq);
        }
    };

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        }
    }, []);

    return (
        <Fragment>
            <ShippingAddressForm
                fullName={fullName}
                setFullname={setFullname}
                addressLine={addressLine}
                setAddressline={setAddressline}
                telephone={telephone}
                setTelephone={setTelephone}
                length={length}
                setLength={setLength}
                shippingFee={shippingFee}
                setShippingFee={setShippingFee}
                savedAddresses={savedAddresses}
                countries={countries}
                countryId={countryId}
                setCountryId={setCountryId}
                ready={ready}
                value={value}
                setValue={setValue}
                status={status}
                data={data}
                clearSuggestions={clearSuggestions}
                handleSelectPlace={handleSelectPlace}
                selectPlaceItems={selectPlaceItems}
                isGoogleMapLoaded={isLoaded}
                setCurrentPosition={setCurrentPosition}
                currentPosition={currentPosition}
                mapRef={mapRef}
                onSubmit={onSubmit}
            />
        </Fragment>
    );
}