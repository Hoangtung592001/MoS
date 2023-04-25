import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Fragment } from 'react';
import { checkTokenExpiry, getAccessTokenFromCookies } from './commons/commonUsedFunctions';
import { useAppDispatch, useAppSelector } from './hooks';
import { bindActionCreators } from 'redux';
import actionCreators from './redux';
import { Roles } from './constants';
import config from './config';
import routes from './config/routes';

function App() {
    const accessToken = getAccessTokenFromCookies();
    const dispatch = useAppDispatch();
    const { checkAdminAction } = bindActionCreators(actionCreators, dispatch);
    const { isAdmin } = useAppSelector(state => state.user);
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const isTokenExpire = checkTokenExpiry(accessToken);
        if (!isTokenExpire) {
            setIsSignedIn(true);
            checkAdminAction(accessToken);
        }
    }, [accessToken]);
    return (
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index: number) => {
                            const Page = route.component;
                            const Layout = route.layout === null ? Fragment : route.layout ? route.layout : DefaultLayout;
                            // const cannotAccess = (!isAdmin && route.accessPermission === Roles.Admin) ||
                            //                     (isSignedIn && route.accessPermission === Roles.NotSignedIn)
                            
                            // if (cannotAccess) {
                            //     return;
                            // }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route path="*" element={<Navigate to={routes.home} replace />}/>
                    </Routes>
                </div>
            </Router>
    );
}

export default App;
