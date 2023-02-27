import './PaymentOptionsContainer.scss';
import Select, { SelectItem } from '~/components/Select';
import { Cash, Visa } from '~/layouts/components';
import { Button } from '~/components';
import { ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PaymenOptionTypeDescriptions, RequestStatus } from '~/constants';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import SavedCard from '~/layouts/components/SavedCard';
import { SetPaymentOptionReq } from '~/redux/action-creators/paymenOptionsActionCreator';

export default function PaymentOptionsContainer() {
    const [cardNumber, setCardNumber] = useState<string>();
    const [expirationDate, setExpirationDate] = useState<Date>();
    const [nameOnCreditCard, setNameOnCreditCard] = useState<string>();
    const dispatch = useAppDispatch();
    const { getPaymentOptionTypeDescriptions, getPaymentOptions, resetPaymentOption } = bindActionCreators(
        actionCreators,
        dispatch,
    );
    const [currentPaymentOption, setCurrentOption] = useState(PaymenOptionTypeDescriptions.Cash);
    const [isVisaChecked, setIsVisaChecked] = useState<boolean>(false);
    const accessToken = getAccessTokenFromCookies();
    const navigate = useNavigate();
    const location = useLocation();
    const addressId = location.state?.addressId;
    const paymentOptionTypeDescriptions = useAppSelector(
        (state) => state.paymentOptionTypeDescriptionReducer.paymentOptionTypeDescriptions,
    );

    const { status, newPaymentOptionId } = useAppSelector((state) => state.paymenOptionsReducer);
    const paymentOptions = useAppSelector((state) => state.paymenOptionsReducer.paymentOptions);

    const selectItems = useMemo<Array<SelectItem>>(
        () =>
            paymentOptionTypeDescriptions.map((paymentOptionTypeDescription) => {
                const option: SelectItem = {
                    id: paymentOptionTypeDescription.id,
                    value: paymentOptionTypeDescription.name,
                };
                return option;
            }),
        [paymentOptionTypeDescriptions],
    );

    const onNavigate = useCallback((paymentOptionId: string, addressId: string) => {
        navigate(routes.reviewOrder, {
            state: {
                paymentOptionId: paymentOptionId,
                addressId: addressId,
            },
        });
    }, []);

    const onUse = useCallback(
        (paymentOptionId: string) => {
            onNavigate(paymentOptionId, addressId);
        },
        [addressId],
    );

    useEffect(() => {
        if (status == RequestStatus.Fulfilled && newPaymentOptionId) {
            resetPaymentOption();
            onNavigate(newPaymentOptionId, addressId);
        }
    }, [status, newPaymentOptionId]);

    const { setPaymentOption } = bindActionCreators(actionCreators, dispatch);

    const onSaveCard = () => {
        if (
            cardNumber &&
            expirationDate &&
            nameOnCreditCard &&
            currentPaymentOption == PaymenOptionTypeDescriptions.Visa
        ) {
            const setPaymentReq: SetPaymentOptionReq = {
                cardNumber: cardNumber,
                expirationDate: expirationDate,
                nameOnCreditCard: nameOnCreditCard,
                paymentOptionTypeDescriptionId: PaymenOptionTypeDescriptions.Visa,
                accessToken: accessToken,
            };
            setPaymentOption(setPaymentReq);
        }
    };

    useEffect(() => {
        getPaymentOptionTypeDescriptions();
        getPaymentOptions(accessToken);
    }, []);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        }
        if (!addressId) {
            navigate(routes.basket);
        }
    }, []);

    return (
        <div className="payment-options-container">
            <h3 className="payment-options__title">Enter your payment details</h3>
            {paymentOptions.length > 0 && (
                <>
                    <h3 className="payment-options__saved-card-title">Saved Card</h3>
                    <div className="payment-options-saved-cards">
                        <SavedCard paymentOptions={paymentOptions} onUse={onUse} />
                    </div>
                </>
            )}
            <div className="payment-options-selections">
                <Select
                    label="Payment Method"
                    isRequired={true}
                    items={selectItems}
                    value={currentPaymentOption}
                    onChange={(e: any) => setCurrentOption(e.target.value)}
                />
            </div>
            {currentPaymentOption == PaymenOptionTypeDescriptions.Visa ? (
                <div className="payment-options-visa">
                    <Visa
                        isVisaChecked={isVisaChecked}
                        setIsVisaChecked={setIsVisaChecked}
                        cardNumber={cardNumber}
                        setCardNumber={setCardNumber}
                        expirationDate={expirationDate}
                        setExpirationDate={setExpirationDate}
                        nameOnCreditCard={nameOnCreditCard}
                        setNameOnCreditCard={setNameOnCreditCard}
                    />
                </div>
            ) : currentPaymentOption == PaymenOptionTypeDescriptions.Cash ? (
                <div className="payment-options-cash">
                    <Cash />
                </div>
            ) : null}
            <div className="payment-options-submit">
                <Button type={ButtonTypes.ADDTOBASKET} onClick={onSaveCard} isLoading={status == RequestStatus.Pending}>
                    <span className="payment-options-submit__text">{localizations.saveAndContinue}</span>
                </Button>
            </div>
        </div>
    );
}
