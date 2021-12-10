

// action types
const SET_GROUP_INDEX = "SET_GROUP_INDEX";

// action creators
const setGroupIndexOnStateAction = (index) => {
  return {
    type: SET_GROUP_INDEX,
    currentGroupIndex: index,
  };
};

// thunks
export const _setGroupIndexOnState = (index) => async (dispatch) => {
  try {
    dispatch(setGroupIndexOnStateAction(index))
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function setGroupIndexOnState(state = 0, action) {
  switch (action.type) {
    case SET_GROUP_INDEX:
      return action.currentGroupIndex;
    default:
      return state;
  }
}
