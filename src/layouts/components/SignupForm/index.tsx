import { InputTypes, ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { Input, TextLink, Button, Alert } from '~/components';
import { TextLinkTypes } from '~/constants/enums';
import './SignupForm.scss';
import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useState, useCallback, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '~/hooks';
import ErrorBox from '../ErrorBox';
import { SignUpProps } from '~/redux/action-creators/userActionCreator';
import { RequestStatus } from '~/constants';
export default function SignupForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [reEnteredPassword, setReEnteredPassword] = useState<string>('');
    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isReEnteredPasswordValid, setIsReEnteredPasswordValid] = useState<boolean>(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signUp, resetUserAction } = bindActionCreators(actionCreators, dispatch);
    const { signUpError, signUpStatus } = useAppSelector((state) => state.user);
    const onSubmit = useCallback((username: string, password: string, reEnteredPassword: string) => {
        if (username.length < 6) {
            setIsUsernameValid(false);
        } else if (password.length < 6) {
            setIsPasswordValid(false);
        } else if (password !== reEnteredPassword) {
            setIsReEnteredPasswordValid(false);
        } else {
            const signUpProps: SignUpProps = {
                username,
                password,
            };
            signUp(signUpProps);
        }
    }, []);

    useEffect(() => {
        if (signUpStatus == RequestStatus.Fulfilled) {
            resetUserAction();
            navigate(routes.home);
        }
    }, [signUpStatus]);

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
                {signUpError ? (
                    <div className="sign-in-error">
                        <ErrorBox message={signUpError.description} />
                    </div>
                ) : null}
                <div className="sign-in-form display-flex flex-direction--column">
                    <h4 className="sign-in__header">{localizations.createAccount}</h4>
                    <div className="sign-in-form-container">
                        <div className="sign-in-form-container">
                            {/* <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.yourName}
                                </label>
                                <Input inputType={InputTypes.SEARCH} placeholder={localizations.firstAndLastName} />
                            </div> */}
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.username}
                                </label>
                                <Input
                                    inputType={InputTypes.SEARCH}
                                    value={username}
                                    onChange={(e: any) => {
                                        setUsername(e.target.value);
                                        setIsUsernameValid(true);
                                    }}
                                    isValid={isUsernameValid}
                                />
                                <Alert>
                                    <span className="sign-up-form-input__alert">
                                        {localizations.usernameValidation}
                                    </span>
                                </Alert>
                            </div>
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.password}
                                </label>
                                <Input
                                    inputType={InputTypes.SEARCH}
                                    placeholder={localizations.atLeast6Charaters}
                                    value={password}
                                    onChange={(e: any) => {
                                        setPassword(e.target.value);
                                        setIsPasswordValid(true);
                                    }}
                                    isValid={isPasswordValid}
                                    type="password"
                                />
                                <Alert>
                                    <span className="sign-up-form-input__alert">{localizations.alertPassword}</span>
                                </Alert>
                            </div>
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.reEnterPassword}
                                </label>
                                <Input
                                    inputType={InputTypes.SEARCH}
                                    value={reEnteredPassword}
                                    isValid={isReEnteredPasswordValid}
                                    onChange={(e: any) => {
                                        setReEnteredPassword(e.target.value);
                                        setIsReEnteredPasswordValid(true);
                                    }}
                                    type="password"
                                />
                            </div>
                            <div className="sign-in-form-submit">
                                <Button
                                    type={ButtonTypes.SIGNIN}
                                    onClick={(e: any) => {
                                        onSubmit(username, password, reEnteredPassword);
                                    }}
                                    isLoading={signUpStatus == RequestStatus.Pending}
                                >
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
