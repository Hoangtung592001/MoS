import React from 'react';
import './TextLink.scss';
import { Link } from 'react-router-dom';

function TextLink({type, children}: any) {
    return(
        <Link to="/" className={type ? `text-link text-link--${type}` : 'text-link'}>{children}</Link>
    )
}

export default TextLink;