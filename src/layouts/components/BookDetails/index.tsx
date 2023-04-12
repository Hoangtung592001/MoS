import './BookDetails.scss';
import localizations from '~/constants/locallizations';
import { Fragment, useEffect } from 'react';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { FETCH_TYPES, fetchAsyncWithAuthentitaion } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';

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
                        <div className="book-details-characteristics display-flex" key={index}>
                            <h4 className="book-details-characteristics__header">{title}</h4>

                            <div className="book-details-characteristic">
                                {props.bookDetails[title]['value'] ? (
                                    <Fragment>
                                        <div className="book-details-characteristic-container">
                                            <div className="book-details-characteristic-content display-flex flex-direction--column">
                                                <span>{props.bookDetails[title]['value']}</span>
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : null}

                                {subItems.map((item: any, key) => {
                                    return (
                                        <Fragment key={key}>
                                            <h4 className="book-details-characteristic__header">{item}:</h4>
                                            <div className="book-details-characteristic-content display-flex flex-direction--column">
                                                <span>{props.bookDetails[title][item]}</span>
                                            </div>
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            }
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
