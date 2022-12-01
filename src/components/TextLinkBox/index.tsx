import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import './TextLinkBox.scss';

interface TextLinkBoxProps {
    to: string;
    text: string;
    type?: string;
}

export default function TextLinkBox({ to, text, type }: TextLinkBoxProps) {
    return (
        <Link to={to} className={`${type ? 'text-link-box--type text-link-box' : 'text-link-box'} display-block`}>
            <span className='text-link-box__text'>
                {text}
            </span>
            <AiOutlineRight className='text-link-box__icon'/>
        </Link>
    )
}