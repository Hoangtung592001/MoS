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
import Select from '~/components/Select';
export default function ShippingAddressContainer() {
    return (
        <>
            <Select />
        </>
    );
}
