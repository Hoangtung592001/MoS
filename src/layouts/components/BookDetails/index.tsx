import './BookDetails.scss';
import localizations from '~/constants/locallizations';

export default function BookDetails() {
    return (
        <div className='book-details'>
            <div className='book-details-about-item'>
                <h4 className='book-details-about-item__header'>{localizations.aboutThisItem}</h4>
                <span className='book-details-about-item__content'>New. In shrink wrap. Looks like an interesting title!. Seller Inventory # Q-1411423410</span>
            </div>
            <div className='book-details-characteristics display-flex'>
                <h4 className='book-details-characteristics__header'>Bibliographic Details</h4>
                <div className='book-details-characteristic'>
                    <div className='book-details-characteristic-container'>
                        <h4 className='book-details-characteristic__header'>Synopsis:</h4>
                        <div className='book-details-characteristic-content display-flex flex-direction--column'>
                            <span>Title: How to Write a Research Paper [Paperback] ...</span>
                            <span>Publisher: Sparknotes</span>
                            <span>Publication Date: 1963</span>
                            <span>Binding: Soft cover</span>
                            <span>Book Condition: New.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='book-details-characteristics display-flex'>
                <h4 className='book-details-characteristics__header'>About this title</h4>
                <div className='book-details-characteristic'>
                    <div className='book-details-characteristic-container'>
                        <h4 className='book-details-characteristic__header'>Synopsis:</h4>
                        <div className='book-details-characteristic-content display-flex flex-direction--column'>
                            <span>Used. Very Good conditions. May have soft reading marks and name of the previous owner.</span>
                            <span>"About this title" may belong to another edition of this title.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='book-details-characteristics display-flex'>
                <h4 className='book-details-characteristics__header'>Store Description</h4>
                <div className='book-details-characteristic'>
                    <div className='book-details-characteristic-container'>
                        <h4 className='book-details-characteristic__header'>Terms of Sale:</h4>
                        <div className='book-details-characteristic-content display-flex flex-direction--column'>
                            <span>We guarantee the condition of every book as it's described on the Abebooks web sites. If you're dissatisfied with your purchase (Incorrect Book/Not as Described/Damaged) or if the order hasn't arrived, you're eligible for a refund within 30 days of the estimated delivery date. If you've changed your mind about a book that you've ordered, please use the Ask bookseller a question link to contact us and we'll respond within 2 business days.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='book-details-characteristics display-flex'>
                <h4 className='book-details-characteristics__header'>{localizations.paymentMethods}</h4>
                <div className='book-details-characteristic'>
                    <img src="https://www.abebooks.com/images/Shared/icons/cc-visa.png" alt="" />
                    <img src="https://www.abebooks.com/images/Shared/icons/cc-masterc.png" alt="" />
                    <img src="https://www.abebooks.com/images/Shared/icons/cc-amex.png" alt="" />
                </div>
            </div>
        </div>
    );
}
