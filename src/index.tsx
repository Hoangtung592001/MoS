import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { GlobalStyles } from '~/components';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    // <React.StrictMode>
    <GlobalStyles>
        <Provider store={store}>
            <App />
        </Provider>
    </GlobalStyles>
    // </React.StrictMode>,
);
