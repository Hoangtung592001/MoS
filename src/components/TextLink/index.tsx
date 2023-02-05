import React from 'react';
import './TextLink.scss';
import { Link } from 'react-router-dom';

function TextLink({type, children, ...props}: any) {
    return(
        <Link className={type ? `text-link text-link--${type}` : 'text-link'} {...props}>{children}</Link>
    )
}

export default TextLink;