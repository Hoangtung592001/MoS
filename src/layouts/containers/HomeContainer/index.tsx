import localizations from '~/constants/locallizations';
import { SearchAndCarousel, ProductCardList, CardList } from '../../components';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { bindActionCreators } from 'redux';
import './HomeContainer.scss';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { ProductItem } from '~/constants/interfaces';
export default function HomeContainer() {
    const dispatch = useAppDispatch();
    const frequentlyViewedItems = useAppSelector(state => state.frequentlyViewedItemsReducer.items);
    const { getFrequentlyViewedItems, getRecentlyViewedItems, resetBookDetails, getTrendingItems } = bindActionCreators(actionCreators, dispatch);
    const accessToken = getAccessTokenFromCookies();
    const { recentlyViewedItems, trendingItems } = useAppSelector(state => state.bookDetailsReducer);

    const recentlyViewItemsProductItems = useMemo(() => {
        return recentlyViewedItems.map(item => {
            return {
                id: item.id,
                title: item.title,
                author: item.author,
                bookImage: item.bookImage
            } as ProductItem
        })
    }, [recentlyViewedItems]);

    useEffect(() => {
        getFrequentlyViewedItems();
        getTrendingItems();
    }, []);

    useEffect(() => {
        if (accessToken) {
            getRecentlyViewedItems(accessToken);
        }

        return () => {
            resetBookDetails();
        }
    }, [accessToken]);

    return (
        <div className='home-container'>
            <SearchAndCarousel />
            <div className='home-container-product-card'>
                <ProductCardList title={localizations.frequentlyViewedItems} items={frequentlyViewedItems}/>
            </div>
            <div className='home-container-product-card'>
                <ProductCardList title={localizations.trendingItems} items={trendingItems}/>
            </div>
            {
                recentlyViewItemsProductItems.length > 0 &&
                <div className='home-container-product-card'>
                    <ProductCardList title={localizations.recentlyViewedItems} items={recentlyViewItemsProductItems}/>
                </div>
            }
            <CardList />
        </div>
    );
}
