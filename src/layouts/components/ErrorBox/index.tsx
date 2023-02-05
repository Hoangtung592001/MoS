import './ErrorBox.scss';
import { AiOutlineWarning } from 'react-icons/ai';
import localizations from '~/constants/locallizations';
function ErrorBox({ message }: any) {
    return (
        <div className="error-box display-flex align-items--center">
            <div className='error-box-icon display-flex align-items--center'>
                <AiOutlineWarning />
            </div>
            <div className='error-box-content'>
                <h2 className='error-box-content__header'>
                    {localizations.warningHeader}
                </h2>
                <p className='error-box-content__message'>
                    {message}
                </p>
            </div>
        </div>
    )
}

export default ErrorBox;