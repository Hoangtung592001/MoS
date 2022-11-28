import './ProductCard.scss';
import { Link } from 'react-router-dom';
interface ProductProps {
    url: string;
    title: string;
    author: string;
    to: string;
}

export default function ProductCard({ url, title, author, to }: ProductProps) {
    return (
        <div className='product-card'>
            <Link to={to} className='product-card__img'>
                <img src={url} alt="Book Image" />
            </Link>
            <div className='product-card-body'>
                <Link to={to} className='product-card-body__title'>{title}</Link>
                <span className='product-card-body__author'>{author}</span>
            </div>
        </div>
    )
}