import './ShippingAddressContainer.scss';
import { Fragment, useCallback, useEffect } from 'react';
import { ShippingAddressForm } from '~/layouts/components';
import { useState } from 'react';
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { accessTokenKey } from '~/constants';
import routes from '~/config/routes';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { BookItem } from '~/layouts/components/BasketTable';
export default function ShippingAddressContainer() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    const [fullName, setFullname] = useState<string>();
    const [addressLine, setAddressline] = useState<string>();
    const [telephone, setTelephone] = useState<string>();
    const [length, setLength] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [latitude, setLatitude] = useState<number>();
    const [shippingFee, setShippingFee] = useState<number>();
    const dispatch = useAppDispatch();
    const { getSavedAddress } = bindActionCreators(actionCreators, dispatch);
    const savedAddresses = useAppSelector((state) => state.addressReducer.savedAddresses);
    const location = useLocation();
    const bookItems: Array<BookItem> = location.state?.bookItems;
    useEffect(() => {
        getSavedAddress(accessToken);
    }, []);

    const onSubmit = useCallback(async () => {
        if (accessToken) {
            try {
                await fetchAsyncWithAuthentitaion<boolean>(SERVICE_URL.ADDRESS.GET, FETCH_TYPES.POST, accessToken, {
                    fullName: fullName,
                    addressLine: addressLine,
                    telephone: telephone,
                    longitude: longitude,
                    latitude: latitude,
                    distance: length,
                });
            } catch (e) {}
        }
    }, []);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        }

        if (!bookItems) {
            navigate(routes.basket);
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
                longitude={longitude}
                setLongitude={setLongitude}
                latitude={latitude}
                setLatitude={setLatitude}
                shippingFee={shippingFee}
                setShippingFee={setShippingFee}
                savedAddresses={savedAddresses}
                bookItems={bookItems}
            />
        </Fragment>
    );
}