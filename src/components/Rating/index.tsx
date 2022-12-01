import './Rating.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface RatingProps {
    stars: number;
}

export default function Rating({ stars }: RatingProps) {
    const floorStars = Math.floor(stars);
    const starIcons = [];

    for (let i = 0; i < floorStars; i++) {
        starIcons.push(<BsStarFill />);
    }

    if (stars - floorStars >= 0.5) {
        starIcons.push(<BsStarHalf />);
    }

    while (starIcons.length !== 5) {
        starIcons.push(<BsStar />);
    }

    return <div className="rating">{starIcons.map((starIcon) => starIcon)}</div>;
}
