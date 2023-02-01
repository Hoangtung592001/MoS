import { ButtonLinkTypes, InputTypes, ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { ButtonLink, Input, TextLink, Checkbox, Button } from '~/components';
import { TextLinkTypes } from '~/constants/enums';
import './SigninForm.scss';
import { useState } from 'react';
import { SignInRequest } from '~/redux/actions/userAction';
import { useAppDispatch, useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { bindActionCreators } from 'redux';

export default function SigninForm() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = bindActionCreators(actionCreators, dispatch);
    const { accessToken } = useAppSelector(state => state.user.token);
    const { errors } = useAppSelector(state => state.user);
    console.log(accessToken);
    console.log(errors);

    return (
        <div className="sign-in">
            <div className="sign-in-container margin-auto display-flex flex-direction--column align-items--center">
                <img src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png" alt="MoSBooks" className='sign-in__logo'/>
                <div className="sign-in-form display-flex flex-direction--column">
                    <h4 className="sign-in__header">{localizations.signin}</h4>
                    <div className='sign-in-form-container'>
                        <div className="sign-in-form-container">
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.email}
                                </label>
                                <Input inputType={InputTypes.SEARCH} placeholder={localizations.enterEmail} value={email} onChange={({ target }: any) => setEmail(target.value)} />
                            </div>
                            <div className="sign-in-form-input">
                                <div className='sign-in-form-input-container display-flex justify-content--space-between'>
                                    <label htmlFor="" className="search-form-input__label">
                                        {localizations.password}
                                    </label>
                                    <TextLink type={TextLinkTypes.BLUE}>
                                        <span className="sign-in-form__text-link">
                                            {localizations.forgetPassword}
                                        </span>
                                    </TextLink>
                                </div>
                                <Input inputType={InputTypes.SEARCH} placeholder={localizations.enterPassword} type="password" value={password} onChange={({ target }: any) => setPassword(target.value)} />
                            </div>
                            <div className="sign-in-form-submit">
                                <Button 
                                    type={ButtonTypes.SIGNIN}
                                    onClick={() => {
                                        const user: SignInRequest = {
                                            username: email,
                                            password: password
                                        };

                                        signIn(user);
                                    }}
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
                                <ButtonLink to="" type={ButtonLinkTypes.CREATE_ACCOUNT}>
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