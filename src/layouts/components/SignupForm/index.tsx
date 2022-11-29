import { ButtonLinkTypes, InputTypes, ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { ButtonLink, Input, TextLink, Checkbox, Button } from '~/components';
import { TextLinkTypes } from '~/constants/enums';
// import './SigninForm.scss';

export default function SignupForm() {
    return (
        <div className="sign-in">
            <div className="sign-in-container margin-auto display-flex flex-direction--column align-items--center">
                <img src="https://m.media-amazon.com/images/G/01/abebooks/site/abebooks-logo._CB451365245_.png" alt="MoSBooks" className='sign-in__logo'/>
                <div className="sign-in-form display-flex flex-direction--column">
                    <h4 className="sign-in__header">Sign In</h4>
                    <div className='sign-in-form-container'>
                        <div className="sign-in-form-container">
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.email}
                                </label>
                                <Input type={InputTypes.SEARCH} placeholder={localizations.searchByAuthor} />
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
                                <Input type={InputTypes.SEARCH} placeholder={localizations.searchByAuthor} />
                            </div>
                            <div className="sign-in-form-submit">
                                <Button type={ButtonTypes.SIGNIN}>
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