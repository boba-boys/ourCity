import {createStore, combineReducers, applyMiddleware} from 'redux';
// import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import tags from '../tags'
import groups from '../groups'
import users from '../user';
import groupStatus from '../groupStatus';
import tagScreenStatus from '../tagScreenStatus';
import tagDetails from '../tagDetails';
import allTagsScreenStatus from '../allTagsScreenStatus';
import addTagsStatus from '../addTagStatus';
import addTagCoordinates from '../TagCoordinates'
import setGroupIdOnState from '../groupState'
import setSearchResultsOnState from '../searchResultsOnState';
import searchScreenStatus from '../SearchScreenStatus';
import setPressedSearchResultsOnState from '../pressedSearch';
import allComments from '../allComments';
import setPhotoOnStateReducer from '../setPhotoOnState';
import setPlacesArrayOnStateReducer from '../setPlacesArrayOnState'
import setSearchResultsPhotosArrayOnStateReducer from '../setSearchResultPhotosOnState'


const reducer= combineReducers({
    tags,
    tagDetails,
    groups,
    setPhotoOnStateReducer,
    setSearchResultsPhotosArrayOnStateReducer,
    carouselStatus,
    groupStatus,
    setPlacesArrayOnStateReducer,
    addTagsStatus,
    addTagCoordinates,
    setGroupIdOnState,
    users,
    setSearchResultsOnState,
    searchScreenStatus,
    setPressedSearchResultsOnState,
    tagScreenStatus,
    allTagsScreenStatus,
    allComments,
});

const middleware= composeWithDevTools(
    applyMiddleware(thunkMiddleware, /* createLogger({ collapsed: true}) */)
);

const store= createStore(reducer, middleware);

export default store;
