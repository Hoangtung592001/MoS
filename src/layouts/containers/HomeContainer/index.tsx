import { Fragment } from 'react';
import { SearchAndCarousel, FrequentlyViewItems } from '../../components';

export default function HomeContainer() {
    return (
        <Fragment>
            <SearchAndCarousel />
            <FrequentlyViewItems />
        </Fragment>
    );
}
