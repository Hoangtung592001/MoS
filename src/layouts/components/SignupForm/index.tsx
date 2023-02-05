import { InputTypes, ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { Input, TextLink, Button, Alert } from '~/components';
import { TextLinkTypes } from '~/constants/enums';
import './SignupForm.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
export default function SignupForm() {
    return (
        <div className="sign-in">
            <div className="sign-in-container margin-auto display-flex flex-direction--column align-items--center">
                <Link to={routes.home}>
                    <img
                        src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png"
                        alt="MoSBooks"
                        className="sign-in__logo"
                    />
                </Link>
                <div className="sign-in-form display-flex flex-direction--column">
                    <h4 className="sign-in__header">{localizations.createAccount}</h4>
                    <div className="sign-in-form-container">
                        <div className="sign-in-form-container">
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.yourName}
                                </label>
                                <Input inputType={InputTypes.SEARCH} placeholder={localizations.firstAndLastName} />
                            </div>
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.email}
                                </label>
                                <Input inputType={InputTypes.SEARCH} />
                            </div>
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.password}
                                </label>
                                <Input inputType={InputTypes.SEARCH} placeholder={localizations.atLeast6Charaters} />
                                <Alert>
                                    <span className="sign-up-form-input__alert">{localizations.alertPassword}</span>
                                </Alert>
                            </div>
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.reEnterPassword}
                                </label>
                                <Input inputType={InputTypes.SEARCH} />
                            </div>
                            <div className="sign-in-form-submit">
                                <Button type={ButtonTypes.SIGNIN}>
                                    <span className="sign-in-form__submit-text">
                                        {localizations.createYourMosBooksAccount}
                                    </span>
                                </Button>
                            </div>
                            <div className="sign-in-form-input">
                                <span>{localizations.signinTermsAndConditions}</span>
                                <TextLink type={TextLinkTypes.BLUE}>
                                    <span>Privacy Policy</span>
                                </TextLink>
                                <span>and</span>
                                <TextLink type={TextLinkTypes.BLUE}>
                                    <span>Terms & Conditions</span>
                                </TextLink>
                            </div>
                            <div className="sign-in-form-input">
                                <span>{localizations.alreadyHaveeAnAccount}</span>
                                <TextLink type={TextLinkTypes.BLUE} to={routes.signin}>
                                    <span>{localizations.signin}</span>
                                </TextLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
