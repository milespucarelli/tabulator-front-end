import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router'
import userReducer from './reducers/userReducer'
import compositionReducer from './reducers/compositionReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    user: userReducer,
    composition: compositionReducer
  })
}

const history = createBrowserHistory()

const store = createStore(createRootReducer(history), composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
