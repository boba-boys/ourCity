import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import tags from '../tags'
import groups from '../groups'
import carouselStatus from '../carouselStatus';

const reducer= combineReducers({
    tags,
    groups,
    carouselStatus,
});

const middleware= composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true}))
);

const store= createStore(reducer, middleware);

export default store;
