import React from 'react';
import { Header, Footer } from '../components';
import './DefaultLayout.scss';

function DefaultLayout({ children }: any) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
