import { createStore, combineReducers, applyMiddleware } from 'redux';
//if you need this put it back in the middleware (may need a compose or something) and figure out how to have it only when in development mode
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import map from './map';
//figure out what this does, if you need it, and replace it if you don't
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({ map });

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
