import './BookDetailsContainer.scss';
import { BookIntro, BookDetails, PriceInfo } from '../../components';
import { Fragment } from 'react';
export default function BookDetailsContainer() {
    return (
        <Fragment>
            <div className="display-flex">
                <div>
                    <BookIntro />
                    <BookDetails />
                </div>
                <PriceInfo />
            </div>
        </Fragment>
    );
}
