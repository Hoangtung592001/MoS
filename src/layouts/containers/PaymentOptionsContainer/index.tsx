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
import { CashPaymentOptionId, PaymenOptionTypeDescriptions, RequestStatus } from '~/constants';
import { checkTokenExpiry, getAccessTokenFromCookies, hideCardNumber } from '~/commons/commonUsedFunctions';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import SavedCard from '~/layouts/components/SavedCard';
import { SetPaymentOptionReq } from '~/redux/action-creators/paymenOptionsActionCreator';
import jwtDecode from 'jwt-decode';

export default function PaymentOptionsContainer() {
    const [cardNumber, setCardNumber] = useState<string>();
    const [isCardNumberValid, setIsCardNumberValid] = useState<boolean>(true);
    const [expirationDate, setExpirationDate] = useState<Date>();
    const [isExpirationDateValid, setIsExpirationDateValid] = useState<boolean>(true);
    const [nameOnCreditCard, setNameOnCreditCard] = useState<string>();
    const [isNameOnCreditCardValid, setIsNameOnCreditCardValid] = useState<boolean>(true);
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
        if (currentPaymentOption == PaymenOptionTypeDescriptions.Visa) {
            if (!cardNumber) {
                setIsCardNumberValid(false);
            }
            if (!expirationDate) {
                setIsExpirationDateValid(false);
            }
            if (!nameOnCreditCard) {
                setIsNameOnCreditCardValid(false);
            }
        }

        if (
            cardNumber &&
            expirationDate &&
            nameOnCreditCard &&
            currentPaymentOption == PaymenOptionTypeDescriptions.Visa
        ) {
            const setPaymentReq: SetPaymentOptionReq = {
                cardNumber: hideCardNumber(cardNumber),
                expiryDate: new Date(expirationDate),
                nameOnCreditCard: nameOnCreditCard,
                paymentOptionTypeDescriptionId: PaymenOptionTypeDescriptions.Visa,
                accessToken: accessToken,
            };
            setPaymentOption(setPaymentReq);
        } else if (currentPaymentOption == PaymenOptionTypeDescriptions.Cash) {
            onNavigate(CashPaymentOptionId, addressId);
        }
    };

    useEffect(() => {
        getPaymentOptionTypeDescriptions();
        getPaymentOptions(accessToken);
    }, []);

    useEffect(() => {
        if (!accessToken) {
            navigate(routes.signin);
        } else {
            const tokenExpire = checkTokenExpiry(accessToken);
            if (tokenExpire) navigate(routes.signin);
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
                        isCardNumberValid={isCardNumberValid}
                        setIsCardNumberValid={setIsCardNumberValid}
                        isExpirationDateValid={isExpirationDateValid}
                        setIsExpirationDateValid={setIsExpirationDateValid}
                        isNameOnCreditCardValid={isNameOnCreditCardValid}
                        setIsNameOnCreditCardValid={setIsNameOnCreditCardValid}
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
