import './SecurityContainer.scss';
import { SecurityInfo } from '../../components';
import { ButtonLink, TextLink } from '~/components';
import { ButtonLinkTypes } from '~/constants/enums';
export default function SecurityContainer() {
    return <div className='security-container display-flex flex-direction--column align-items--center'>
        <div className='security-container-inner'>
            <h3 className='security-container-inner__header'>Login & security</h3>
            <div>
                <div>
                    <SecurityInfo />
                </div>
                <div>
                    <SecurityInfo />
                </div>
                <div>
                    <SecurityInfo />
                </div>
            </div>
            <div className='security-container-inner-done'>
                <ButtonLink to='/' type={ButtonLinkTypes.BACK_SECURITY}>
                    <span className='security-container-inner-done__text'>
                        Done
                    </span>
                </ButtonLink>
            </div>
        </div>
    </div>
}