import './ShippingAddressContainer.scss';
import { Fragment, useCallback, useEffect } from 'react';
import { ShippingAddressForm } from '~/layouts/components';
import { useState } from 'react';
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { accessTokenKey } from '~/constants';
import routes from '~/config/routes';
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
            />
        </Fragment>
    );
}