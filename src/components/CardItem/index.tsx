import './CardItem.scss';
import { Link } from 'react-router-dom';

interface CardListProps {
    url: string;
    title: string;
    description: string;
    textLink: string;
}

export default function CardItem({ url, title, description, textLink }: CardListProps) {
    return (
        <div className='card-item'>
            <Link to={url} className='card-item__image'>
                <img src={url} alt="Image" />
            </Link>
            <div className='card-item-body'>
                <h4 className='card-item-body__title'>{title}</h4>
                <span className='card-item-body__description'>{description}</span>
                <Link to={url} className='card-item-body__link'>{textLink}</Link>
            </div>
        </div>
    )
}