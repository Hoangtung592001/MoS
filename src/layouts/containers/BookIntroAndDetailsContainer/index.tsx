import './BookIntroAndDetailsContainer.scss';
import { BookIntro, BookDetails, PriceInfo, ProductCardList } from '../../components';
import { Fragment } from 'react';

export default function BookIntroAndDetailsContainer() {
    return (
        <Fragment>
            <div className="book-intro-and-details-container display-flex justify-content--space-between">
                <div className='book-intro-and-details-info'>
                    <BookIntro />
                    <BookDetails />
                </div>
                <div className='book-intro-and-details-price'>
                    <PriceInfo />
                </div>
            </div>
            <div className='book-intro-and-details-recomended-items'>
                <ProductCardList title='Frequently Viewed Items'/>
            </div>
        </Fragment>
    );
}
