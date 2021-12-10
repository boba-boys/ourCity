

// action types
const SET_GROUP_ID = "SET_GROUP_ID";

// action creators
const setGroupIdOnStateAction = (groupId) => {
  return {
    type: SET_GROUP_ID,
    currentGroup: groupId,
  };
};

// thunks
export const _setGroupIdOnState = (groupId) => async (dispatch) => {
  try {
    dispatch(setGroupIdOnStateAction(groupId))
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function setGroupIdOnState(state = null, action) {
  switch (action.type) {
    case SET_GROUP_ID:
      return action.currentGroup;
    default:
      return state;
  }
}
