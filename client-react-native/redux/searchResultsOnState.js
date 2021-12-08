const SET_SEARCH_ON_STATE = "SET_SEARCH_ON_STATE";
const PRESSED_SEARCH_ON_STATE= 'PRESSED_SEARCH_ON_STATE';

// action creators
const setSearchResult = (results) => {
  return {
    type: SET_SEARCH_ON_STATE,
    currentResults: results,
  };
};

const getSearchResult = (results) => {
  return {
    type: PRESSED_SEARCH_ON_STATE,
    pressedResult: results,
  };
};

// thunks
export const setSearchOnState = (results) => async (dispatch) => {
  try {
    dispatch(setSearchResult(results))
  } catch (err) {
    console.log(err);
    return [];
  }
};

// This sets the pressed result in the global state
export const getSearchOnState = (resultPressed) => async (dispatch) => {
  try {
    dispatch(getSearchResult(resultPressed))
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function setSearchResultsOnState(state = [], action) {
  switch (action.type) {
    case SET_SEARCH_ON_STATE:
      return action.currentResults;
    case PRESSED_SEARCH_ON_STATE:
      return action.pressedResult;
    default:
      return state;
  }
}
