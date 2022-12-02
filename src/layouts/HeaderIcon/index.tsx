import React from 'react';
import { HeaderIcon, Footer } from '../components';
import './HeaderIconOnly.scss';

function HeaderIconLayout({ children }: any) {
    return (
        <div className="wrapper">
            <HeaderIcon />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default HeaderIconLayout;
