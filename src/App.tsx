import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Fragment } from 'react';
import { checkTokenExpiry, getAccessTokenFromCookies } from './commons/commonUsedFunctions';
import { useAppDispatch, useAppSelector } from './hooks';
import { bindActionCreators } from 'redux';
import actionCreators from './redux';
import { Roles } from './constants';

function App() {
    const accessToken = getAccessTokenFromCookies();
    const dispatch = useAppDispatch();
    const { checkAdminAction } = bindActionCreators(actionCreators, dispatch);
    const { isAdmin } = useAppSelector(state => state.user);
    useEffect(() => {
        const isTokenExpire = checkTokenExpiry(accessToken);
        if (!isTokenExpire) {
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
                            if (!isAdmin && route.accessPermission === Roles.Admin) {
                                return;
                            }
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
                    </Routes>
                </div>
            </Router>
    );
}

export default App;
