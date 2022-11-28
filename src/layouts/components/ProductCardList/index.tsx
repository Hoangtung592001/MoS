import React from 'react';
import { ProductCard } from '~/components';
import './ProductCardList.scss';

interface FrequentlyViewedItemsProps {
    title: string;
}

export default function FrequentlyViewedItems({ title }: FrequentlyViewedItemsProps) {
    return (
        <div className='product-card-container'>
            <h1 className='product-card__title'>{title}</h1>
            <ul className='product-card-list'>
                <li>
                    <ProductCard url='https://pictures.abebooks.com/inventory/md/md30844371354.jpg' title='The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
' author='J.R.R. Tolkien' to='https://www.google.com' />
                </li>
                <li>
                    <ProductCard url='https://pictures.abebooks.com/inventory/md/md31312053904.jpg' title='The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
' author='J.R.R. Tolkien' to='https://www.google.com' />
                </li>
                <li>
                    <ProductCard url='https://pictures.abebooks.com/inventory/md/md30844371354.jpg' title='The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
' author='J.R.R. Tolkien' to='https://www.google.com' />
                </li>
                <li>
                    <ProductCard url='https://pictures.abebooks.com/inventory/md/md30844371354.jpg' title='The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
' author='J.R.R. Tolkien' to='https://www.google.com' />
                </li>
                <li>
                    <ProductCard url='https://pictures.abebooks.com/inventory/md/md30844371354.jpg' title='The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
The Lord of the Rings Banner poster, Art by Barbara Remington
' author='J.R.R. Tolkien' to='https://www.google.com' />
                </li>
            </ul>
        </div>
    ) 
    
}
