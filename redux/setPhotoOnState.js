const SET_PHOTO_ON_STATE = "SET_PHOTO_ON_STATE";

// action creators
const setSearchResult = (results) => {
  return {
    type: SET_PHOTO_ON_STATE,
    currentResults: results,
  };
};


// thunks
export const setPhotoOnState = (results) => async (dispatch) => {
  try {
    dispatch(setSearchResult(results))
  } catch (err) {
    console.log(err);
    return [];
  }
};


// Reducer
export default function setPhotoOnStateReducer(state = '', action) {
  switch (action.type) {
    case SET_PHOTO_ON_STATE:
      return action.currentResults;
    default:
      return state;
  }
}
