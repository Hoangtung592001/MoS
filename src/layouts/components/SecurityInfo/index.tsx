import './SecurityInfo.scss';
import { ButtonLink } from '~/components';
import { ButtonLinkTypes } from '~/constants/enums';
export default function SecurityInfo() {
    return <div className='security-info display-flex justify-content--space-between align-items--center'>
        <div className='security-info-details display-flex flex-direction--column'>
            <span className='security-info-details__title'>Name:</span>
            <span className='security-info-details__value'>Tung Nguyen Hoang</span>
        </div>
        <div className='security-info-edit'>
            <ButtonLink to='' type={ButtonLinkTypes.EDIT_SECURITY}>
                <span>
                    Edit
                </span>
            </ButtonLink>
        </div>
    </div>
}