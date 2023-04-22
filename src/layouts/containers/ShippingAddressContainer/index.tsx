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
import jwtDecode from 'jwt-decode';
import { checkTokenExpiry, validatePhoneNumber } from '~/commons/commonUsedFunctions';
export default function ShippingAddressContainer() {
    const mapRef = useRef<GoogleMap>();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    const [fullName, setFullname] = useState<string>();
    const [isFullnameValid, setIsFullnameValid] = useState<boolean>(true);
    const [addressLine, setAddressline] = useState<string>();
    const [isAddressLineValid, setIsAddresslineValid] = useState<boolean>(true);
    const [telephone, setTelephone] = useState<string>();
    const [isTelephoneValid, setIsTelephoneValid] = useState<boolean>(true);
    const [length, setLength] = useState<number>();
    const [shippingFee, setShippingFee] = useState<number>();
    const [countryId, setCountryId] = useState<number>(VietNamId);
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral>();
    const [isCurrentPositionValid, setIsCurrentPositionValid] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { getSavedAddress, getCountries, resetAddress } = bindActionCreators(actionCreators, dispatch);
    const savedAddresses = useAppSelector((state) => state.addressReducer.savedAddresses);
    const countries = useAppSelector((state) => state.countryReducer.countries);
    const setAddressStatus = useAppSelector((state) => state.addressReducer.status);
    const { setAddress } = bindActionCreators(actionCreators, dispatch);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBPqQ2EN7r5_akXTlP1LXY4WRZMbJ8TRy8',
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

    const onSubmit = () => {
        if (!fullName) {
            setIsFullnameValid(false);
        }
        if (!addressLine) {
            setIsAddresslineValid(false);
        }
        if (!telephone || !validatePhoneNumber(telephone)) {
            setIsTelephoneValid(false);
        }
        if (!currentPosition) {
            setIsCurrentPositionValid(false);
        }
        if (fullName && addressLine && telephone && validatePhoneNumber(telephone) && currentPosition && length && countryId && accessToken) {
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
        } else {
            const tokenExpire = checkTokenExpiry(accessToken);
            if (tokenExpire) navigate(routes.signin);
        }
    }, []);

    return (
        <Fragment>
            {isLoaded && (
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
                    isGoogleMapLoaded={isLoaded}
                    setCurrentPosition={setCurrentPosition}
                    currentPosition={currentPosition}
                    mapRef={mapRef}
                    onSubmit={onSubmit}
                    setAddressStatus={setAddressStatus}
                    isFullnameValid={isFullnameValid}
                    setIsFullnameValid={setIsFullnameValid}
                    isAddressLineValid={isAddressLineValid}
                    setIsAddresslineValid={setIsAddresslineValid}
                    isTelephoneValid={isTelephoneValid}
                    setIsTelephoneValid={setIsTelephoneValid}
                    isCurrentPositionValid={isCurrentPositionValid}
                    setIsCurrentPositionValid={setIsCurrentPositionValid}
                />
            )}
        </Fragment>
    );
}