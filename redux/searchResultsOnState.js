const SET_SEARCH_ON_STATE = "SET_SEARCH_ON_STATE";

// action creators
const setSearchResult = (results) => {
  return {
    type: SET_SEARCH_ON_STATE,
    currentResults: results,
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


// Reducer
export default function setSearchResultsOnState(state = [], action) {
  switch (action.type) {
    case SET_SEARCH_ON_STATE:
      return action.currentResults;
    default:
      return state;
  }
}
