import { Input } from '~/components';
import { InputTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import './Visa.scss';
import { useState } from 'react';
import { setMaxIdleHTTPParsers } from 'http';
type VisaProps = {
    isVisaChecked: boolean;
    setIsVisaChecked: React.Dispatch<React.SetStateAction<boolean>>;
    cardNumber: string | undefined;
    setCardNumber: React.Dispatch<React.SetStateAction<string | undefined>>;
    expirationDate: Date | undefined;
    setExpirationDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    nameOnCreditCard: string | undefined;
    setNameOnCreditCard: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function Visa({
    isVisaChecked,
    setIsVisaChecked,
    cardNumber,
    setCardNumber,
    expirationDate,
    setExpirationDate,
    nameOnCreditCard,
    setNameOnCreditCard,
}: VisaProps) {
    return (
        <div className="visa">
            <div className="visa-input">
                <label htmlFor="" className="visa-input__label">
                    {localizations.cardNumber}
                    <span className="visa-input__label--required">*</span>
                </label>
                <Input
                    inputType={InputTypes.ADDRESS_FORM}
                    value={cardNumber}
                    onChange={(e: any) => setCardNumber(e.target.value)}
                />
            </div>
            <div className="visa-input--expiry visa-input">
                <label htmlFor="" className="visa-input__label">
                    {localizations.expirationDate}
                    <span className="visa-input__label--required">*</span>
                </label>
                <Input
                    inputType={InputTypes.ADDRESS_FORM}
                    type="date"
                    placeholder="MM / YY"
                    value={expirationDate}
                    onChange={(e: any) => setExpirationDate(e.target.value)}
                />
            </div>
            <div className="visa-input">
                <label htmlFor="" className="visa-input__label">
                    {localizations.nameOnCreditCard}
                    <span className="visa-input__label--required">*</span>
                </label>
                <Input
                    inputType={InputTypes.ADDRESS_FORM}
                    value={nameOnCreditCard}
                    onChange={(e: any) => setNameOnCreditCard(e.target.value)}
                />
            </div>
            <div className="visa-save display-flex align-items--center">
                <div className="visa-save-input">
                    <Input
                        inputType={InputTypes.ADDRESS_FORM}
                        type="checkbox"
                        value={isVisaChecked}
                        onChange={(e: any) => setIsVisaChecked(e.target.value)}
                    />
                </div>
                <label htmlFor="" className="visa-input__label">
                    {localizations.saveThisPayment}
                </label>
            </div>
        </div>
    );
}
