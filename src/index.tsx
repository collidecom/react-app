import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';

import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

const rootStore = new RootStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, rootStore.routerStore);

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
