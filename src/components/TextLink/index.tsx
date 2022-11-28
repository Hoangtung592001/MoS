import React from 'react';
import './TextLink.scss';
import { Link } from 'react-router-dom';

function TextLink({children}: any) {
    return(
        <Link to="/" className='text-link'>{children}</Link>
    )
}

export default TextLink;