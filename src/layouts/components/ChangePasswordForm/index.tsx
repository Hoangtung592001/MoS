import { ButtonLinkTypes, InputTypes, ButtonTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { ButtonLink, Input, TextLink, Checkbox, Button } from '~/components';
import { TextLinkTypes } from '~/constants/enums';


export default function ChangePasswordForm() {
    return (
        <div className="sign-in">
            <div className="sign-in-container margin-auto display-flex flex-direction--column align-items--center">
                <div className="sign-in-form display-flex flex-direction--column">
                    <h4 className="sign-in__header">{localizations.changeEmailAddress}</h4>
                    <div className='sign-in-form-container'>
                        <div className="sign-in-form-container">
                            <div className='change-email-container-text'>
                                <span className='change-email-container-text__value'>
                                    {localizations.currentEmailAddress} olegion2001@gmail.com
                                </span>
                            </div>
                            <div className='change-email-container-text'>
                                <span className='change-email-container-text__value--no-breaklines'>
                                    {localizations.enterOTP}
                                </span>
                            </div>
                            <div className="sign-in-form-input">
                                <label htmlFor="" className="search-form-input__label">
                                    {localizations.newEmailAddress}
                                </label>
                                <Input inputType={InputTypes.SEARCH}/>
                            </div>
                            <div className="sign-in-form-submit">
                                <ButtonLink to="" type={ButtonLinkTypes.BACK_SECURITY}>
                                    <span className="sign-in-form__submit-text">{localizations.continue}</span>
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