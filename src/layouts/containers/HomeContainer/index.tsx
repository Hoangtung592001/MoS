import localizations from '~/constants/locallizations';
import { SearchAndCarousel, ProductCardList, CardList } from '../../components';
import { useEffect } from 'react';
import { ProductItem } from '~/constants/interfaces';
import { useAppDispatch, useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { bindActionCreators } from 'redux';
import './HomeContainer.scss';
export default function HomeContainer() {
    const dispatch = useAppDispatch();
    const frequentlyViewedItems = useAppSelector(state => state.frequentlyViewedItemsReducer.items);
    const trendingItems: Array<ProductItem> = [];
    const { getFrequentlyViewedItems } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        getFrequentlyViewedItems();
    }, []);

    return (
        <div className='home-container'>
            <SearchAndCarousel />
            <div className='home-container-product-card'>
                <ProductCardList title={localizations.frequentlyViewedItems} items={frequentlyViewedItems}/>
            </div>
            <div className='home-container-product-card'>
                <ProductCardList title={localizations.trendingItems} items={frequentlyViewedItems}/>
            </div>
            <CardList />
        </div>
    );
}
