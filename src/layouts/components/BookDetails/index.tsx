import './BookDetails.scss';
import localizations from '~/constants/locallizations';
import { Fragment } from 'react';

interface BookDetailsProps {
    description: string;
    title: string;
    publisher: string;
    publishedAt: Date;
    bookCondition: string;
    bookDetails: any;
}

export default function BookDetails(props: BookDetailsProps) {
    const subTitles = Object.keys(props.bookDetails);

    return (
        <div className='book-details'>
            <div className='book-details-about-item'>
                <h4 className='book-details-about-item__header'>{localizations.aboutThisItem}</h4>
                <span className='book-details-about-item__content'>{props.description}</span>
            </div>
            <div className='book-details-characteristics display-flex'>
                <h4 className='book-details-characteristics__header'>Bibliographic Details</h4>
                <div className='book-details-characteristic'>
                    <div className='book-details-characteristic-container'>
                        <h4 className='book-details-characteristic__header'>Synopsis:</h4>
                        <div className='book-details-characteristic-content display-flex flex-direction--column'>
                            <span>Title: {props.title}</span>
                            <span>Publisher: {props.publisher}</span>
                            <span>Publication Date: {new Date(props.publishedAt).getFullYear()}</span>
                            <span>Book Condition: {props.bookCondition}</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                subTitles.map((title, index) => {
                    const subItems = Object.keys(props.bookDetails[title]).filter(title => title !== "value");
                    return (
                        <div className='book-details-characteristics display-flex' key={index}>
                            <h4 className='book-details-characteristics__header'>{title}</h4>

                            <div className='book-details-characteristic'>
                                {
                                    props.bookDetails[title]["value"] ?
                                    <Fragment>
                                        <div className='book-details-characteristic-container'>
                                            <div className='book-details-characteristic-content display-flex flex-direction--column'>
                                                <span>{props.bookDetails[title]["value"]}</span>
                                            </div>
                                        </div>
                                    </Fragment>
                                    : null
                                }

                                {
                                    subItems.map((item: any) => {
                                        return (
                                            <Fragment>
                                                <h4 className='book-details-characteristic__header'>{item}:</h4>
                                                <div className='book-details-characteristic-content display-flex flex-direction--column'>
                                                    <span>{props.bookDetails[title][item]}</span>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                                {/* <div className='book-details-characteristic-container'>
                                    <h4 className='book-details-characteristic__header'>Synopsis:</h4>
                                    <div className='book-details-characteristic-content display-flex flex-direction--column'>
                                        <span>Used. Very Good conditions. May have soft reading marks and name of the previous owner.</span>
                                        <span>"About this title" may belong to another edition of this title.</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )
                })
            }
            {/* <div className='book-details-characteristics display-flex'>
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
            </div> */}
            {/* <div className='book-details-characteristics display-flex'>
                <h4 className='book-details-characteristics__header'>Store Description</h4>
                <div className='book-details-characteristic'>
                    <div className='book-details-characteristic-container'>
                        <h4 className='book-details-characteristic__header'>Terms of Sale:</h4>
                        <div className='book-details-characteristic-content display-flex flex-direction--column'>
                            <span>We guarantee the condition of every book as it's described on the Abebooks web sites. If you're dissatisfied with your purchase (Incorrect Book/Not as Described/Damaged) or if the order hasn't arrived, you're eligible for a refund within 30 days of the estimated delivery date. If you've changed your mind about a book that you've ordered, please use the Ask bookseller a question link to contact us and we'll respond within 2 business days.</span>
                        </div>
                    </div>
                </div>
            </div> */}
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
