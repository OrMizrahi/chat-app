import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import combineReducers from './reducers'

//config redux with Thunk Middleware and with Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers,
    composeEnhancers(applyMiddleware(thunk)));

//Render App
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.querySelector("#root"));