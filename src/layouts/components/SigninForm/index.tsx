import { ButtonLinkTypes, InputTypes, ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { ButtonLink, Input, TextLink, Checkbox, Button } from '~/components';
import { TextLinkTypes } from '~/constants/enums';
import './SigninForm.scss';
import { useState, useEffect, useCallback } from 'react';
import { SignInRequest } from '~/redux/actions/userAction';
import { useAppDispatch, useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { bindActionCreators } from 'redux';
import { useNavigate, Link } from "react-router-dom";
import config from '~/config';
import ErrorBox from '../ErrorBox';
import routes from '~/config/routes';
import { RequestStatus } from '~/constants';
import { getLengthErrorMessage, validateEmail } from '~/commons/commonUsedFunctions';
export default function SigninForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { accessToken } = useAppSelector(state => state.user.token);
    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [usernameErrorMessage, setUserNameErrorMessage] = useState<string>();
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>();
    const { isLoading, signInRequestStatus } = useAppSelector(state => state.user);
    const { errors } = useAppSelector(state => state.user);
    const { signIn, resetUserAction } = bindActionCreators(actionCreators, dispatch);

    const onSubmit = useCallback((username: string, password: string) => {
        const userNameValid = username.length >= 6 && validateEmail(username);
        const passwordValid = password.length >= 6;
        if (!userNameValid) {
            setIsUsernameValid(false);
            if (username.length < 6) {
                setUserNameErrorMessage(getLengthErrorMessage(6));
            }
            else if (!validateEmail(username)) {
                setUserNameErrorMessage("Email not in correct format");
            }
        }

        if (!passwordValid) {
            setIsPasswordValid(false);
            setPasswordErrorMessage(getLengthErrorMessage(6));
        }

        if (userNameValid && passwordValid) {
            const user: SignInRequest = {
                username: username,
                password: password
            };

            signIn(user);
        }
    }, []);
    
    useEffect(() => {
        if (!isLoading && accessToken) {
            navigate(config.routes.home);
        }
    }, [isLoading]);

    useEffect(() => {
        return () => {
            resetUserAction();
        }
    }, []);

    return (
        <div className="sign-in">
            <div className="sign-in-container margin-auto display-flex flex-direction--column align-items--center">
                <Link to={routes.home}>
                    <img src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png" alt="MoSBooks" className='sign-in__logo'/>
                </Link>
                {
                    errors ?
                    <div className='sign-in-error'>
                        <ErrorBox message={errors.description}/>
                    </div>
                    :
                    null
                }
                <div className="sign-in-form display-flex flex-direction--column">
                    <h4 className="sign-in__header">{localizations.signin}</h4>
                    <div className='sign-in-form-container'>
                        <div className="sign-in-form-container">
                            <div className="sign-in-form-input">
                                <Input
                                        inputType={InputTypes.SEARCH} 
                                        placeholder={localizations.enterEmail} 
                                        value={email} 
                                        onChange={({ target }: any) => {
                                            setEmail(target.value);
                                            setIsUsernameValid(true);
                                        }} 
                                        isValid={isUsernameValid}
                                        label={localizations.email}
                                        isRequired={true}
                                        errorMessage={usernameErrorMessage}
                                    />
                            </div>
                            <div className="sign-in-form-input">
                                <div className='sign-in-form-input-container display-flex justify-content--space-between'>
                                    {/* <label htmlFor="" className="search-form-input__label">
                                        {localizations.password}
                                    </label>
                                    <TextLink type={TextLinkTypes.BLUE}>
                                        <span className="sign-in-form__text-link">
                                            {localizations.forgetPassword}
                                        </span>
                                    </TextLink> */}
                                </div>
                                <Input 
                                    inputType={InputTypes.SEARCH} 
                                    placeholder={localizations.enterPassword} 
                                    type="password" 
                                    value={password} 
                                    onChange={({ target }: any) => {
                                        setPassword(target.value);
                                        setIsPasswordValid(true);
                                    }} 
                                    isValid={isPasswordValid}
                                    label={localizations.password}
                                    isRequired={true}
                                    errorMessage={passwordErrorMessage}
                                />
                            </div>
                            <div className="sign-in-form-submit">
                                <Button 
                                    type={ButtonTypes.SIGNIN}
                                    onClick={() => {
                                        onSubmit(email, password);
                                    }}
                                    isLoading={signInRequestStatus === RequestStatus.Pending}
                                >
                                    <span className="sign-in-form__submit-text">{localizations.signin}</span>
                                </Button>
                            </div>
                            <div className="sign-in-form-input">
                                <span>
                                    {localizations.signinTermsAndConditions}
                                </span>
                            </div>
                            <div className="sign-in-form-input">
                                <Checkbox text={localizations.keepMeSignedIn}/>
                            </div>
                            <div className="sign-in-form-input">
                                <span className='sign-in-form-input__new'>
                                    {localizations.newToMosBooks}
                                </span>
                            </div>
                            <div className="sign-in-form-submit">
                                <ButtonLink to={routes.signup} type={ButtonLinkTypes.CREATE_ACCOUNT}>
                                    <span className="sign-in-form__submit-text">{localizations.createYourMosBooksAccount}</span>
                                </ButtonLink>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}