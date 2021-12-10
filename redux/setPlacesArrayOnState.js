const SET_PHOTOS_ARRAY_ON_STATE = "SET_PHOTOS_ARRAY_ON_STATE";

// action creators
const setPlacesResult = (results) => {
  return {
    type: SET_PHOTOS_ARRAY_ON_STATE,
    currentResults: results,
  };
};


// thunks
export const setPlacesArrayOnStateFunc = (results) => async (dispatch) => {
  try {
    dispatch(setPlacesResult(results))
  } catch (err) {
    console.log(err);
    return [];
  }
};


// Reducer
export default function setPlacesArrayOnStateReducer(state = [], action) {
  switch (action.type) {
    case SET_PHOTOS_ARRAY_ON_STATE:
      return action.currentResults;
    default:
      return state;
  }
}
