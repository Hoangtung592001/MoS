import './BookDetails.scss';
import localizations from '~/constants/locallizations';

export default function BookDetails() {
    return (
        <div>
            <div>
                <h4>{localizations.aboutThisItem}</h4>
                <span>New. In shrink wrap. Looks like an interesting title!. Seller Inventory # Q-1411423410</span>
            </div>
            <div>
                <h4>Bibliographic Details</h4>
                <div>
                    <div>
                        <h5>About this book:</h5>
                        <span>Title: How to Write a Research Paper [Paperback] ...</span>
                        <span>Publisher: Sparknotes</span>
                        <span>Publication Date: 1963</span>
                        <span>Binding: Soft cover</span>
                        <span>Book Condition: New.</span>
                    </div>
                    <div>
                        <h5>About this book:</h5>
                        <span>Title: How to Write a Research Paper [Paperback] ...</span>
                        <span>Publisher: Sparknotes</span>
                        <span>Publication Date: 1963</span>
                        <span>Binding: Soft cover</span>
                        <span>Book Condition: New.</span>
                    </div>
                </div>
            </div>
            <div>
                <h4>{localizations.paymentMethods}</h4>
                <div>
                    <img src="https://www.abebooks.com/images/Shared/icons/cc-visa.png" alt="" />
                    <img src="https://www.abebooks.com/images/Shared/icons/cc-masterc.png" alt="" />
                    <img src="https://www.abebooks.com/images/Shared/icons/cc-amex.png" alt="" />
                </div>
            </div>
        </div>
    );
}
