import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderNumberMessage } from '~/commons/URLs';
import routes from '~/config/routes';
import localizations from '~/constants/locallizations';
import './CongratulationsContainer.scss';

export default function CongratulationsContainer() {
    const location = useLocation();
    const orderId = location.state?.orderId;
    const navigate = useNavigate();
    useEffect(() => {
        if (!orderId) {
            navigate(routes.home);
        }
    }, []);
    return (
        <div className="congratulations">
            <h3 className="congratulations__title">{localizations.thankYou}</h3>
            <span className="congratulations__message">{localizations.thankYouMessage}</span>
            <span className="congratulations__seller">
                <span className="congratulations__seller--orderId">{getOrderNumberMessage(orderId)}</span>
                {localizations.orderNumberGuildline}
            </span>
        </div>
    );
}
