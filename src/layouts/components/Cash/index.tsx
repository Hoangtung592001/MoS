import './Cash.scss';

export default function Cash() {
    return (
        <div className="cash display-flex flex-direction--column">
            <span className="cash__text">Thank You,</span>
            <span className="cash__text">You have selected Cash as a payment method for this order segment.</span>
        </div>
    );
}
