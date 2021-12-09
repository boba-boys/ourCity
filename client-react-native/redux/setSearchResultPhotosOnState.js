const SET_SEARCH_PHOTOS_ARRAY_ON_STATE = "SET_SEARCH_PHOTOS_ARRAY_ON_STATE";

// action creators
const setPlacesResult = (results) => {
  return {
    type: SET_SEARCH_PHOTOS_ARRAY_ON_STATE,
    currentResults: results,
  };
};


// thunks
export const setSearchResultsPhotosArrayOnState = (results) => async (dispatch) => {
  try {
    dispatch(setPlacesResult(results))
  } catch (err) {
    console.log(err);
    return [];
  }
};


// Reducer
export default function setSearchResultsPhotosArrayOnStateReducer(state = [], action) {
  switch (action.type) {
    case SET_SEARCH_PHOTOS_ARRAY_ON_STATE:
      return action.currentResults;
    default:
      return state;
  }
}
