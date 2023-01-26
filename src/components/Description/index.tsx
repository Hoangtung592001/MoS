import './Description.scss';
import ButtonLink from '../ButtonLink';
import { BsArrowRightShort } from 'react-icons/bs';
import { ButtonLinkTypes } from '~/constants/enums';
import { Link } from 'react-router-dom';
interface DescriptionProps {
    title: string;
    content: string;
    textLink: string;
    linkTo: string;
}

export default function Description({ title, content, textLink, linkTo }: DescriptionProps) {
    return (
        <div className="description">
            <h4 className="description-title">{title}</h4>
            <p className="description-content">{content}</p>
            <div className="description-link">
                <Link to={linkTo} className="card-item-body__link description-link__text">
                    {textLink}
                    <BsArrowRightShort className="card-item-body__link__arrow" />
                </Link>
            </div>
        </div>
    );
}
