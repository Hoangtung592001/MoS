import React from 'react';
import { Header } from '../components';
import './DefaultLayout.scss';

function HeaderOnly({ children }: any) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
