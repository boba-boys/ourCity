const PRESSED_SEARCH_ON_STATE= 'PRESSED_SEARCH_ON_STATE';

// action creators

const getSearchResult = (results) => {
  return {
    type: PRESSED_SEARCH_ON_STATE,
    pressedResult: results,
  };
};

// thunks
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
export default function setPressedSearchResultsOnState(state = [], action) {
  switch (action.type) {
    case PRESSED_SEARCH_ON_STATE:
      return action.pressedResult;
    default:
      return state;
  }
}
