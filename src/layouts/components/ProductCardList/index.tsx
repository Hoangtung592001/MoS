import React from 'react';
import { ProductCard } from '~/components';
import { getBookDetailsRoute } from '~/config/routes';
import { ProductItem } from '~/constants/interfaces';
import './ProductCardList.scss';

interface FrequentlyViewedItemsProps {
    title: string;
    items: Array<ProductItem>
}

export default function FrequentlyViewedItems({ title, items }: FrequentlyViewedItemsProps) {
    return (
        <div className='product-card-container'>
            <h1 className='product-card__title'>{title}</h1>
            <ul className='product-card-list justify-content--space-around'>
                {
                    items !== null
                    ?
                    items.map(item=> {
                        return (
                            <li key={item.id} className='product-card-list__item'>
                                <ProductCard
                                    url={item.bookImage.url} 
                                    title={item.title} 
                                    author={item.author.name} 
                                    to={getBookDetailsRoute(item.id)}
                                />
                            </li>
                        )
                    })
                    : 
                    null
                }
                
            </ul>
        </div>
    ) 
    
}
