import React from 'react';
import { Header, Footer } from '../components';
import './FooterOnly.scss';

export default function FooterOnly({ children }: any) {
    return(
        <div className="wrapper">
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    )
}