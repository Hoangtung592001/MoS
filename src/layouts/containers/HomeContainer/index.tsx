import { Fragment } from 'react';
import { SearchAndCarousel, ProductCardList, CardList } from '../../components';
export default function HomeContainer() {
    return (
        <Fragment>
            <SearchAndCarousel />
            <ProductCardList title='Frequently Viewed Items'/>
            <ProductCardList title='Trending Items'/>
            <CardList />
        </Fragment>
    );
}
