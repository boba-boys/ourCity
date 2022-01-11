// action types
const GOT_ALL_TAGS_SCREEN_STATUS = "GOT_ALL_TAGS_SCREEN_STATUS";

// action creators
const _gotAllTagsScreenStatus = (status) => {
  return {
    type: GOT_ALL_TAGS_SCREEN_STATUS,
    tagsScreenState: status,
  };
};

// thunks
export const getAllTagsScreenStatus = (currentStatus) => async (dispatch) => {
  try {
    let newStatus = !currentStatus;
    dispatch(_gotAllTagsScreenStatus(newStatus));
  } catch (err) {
    console.log("Error in getAllTagsScreenStatus thunk", err);
    return [];
  }
};

// Reducer
export default function allTagsScreenStatus(state = false, action) {
  switch (action.type) {
    case GOT_ALL_TAGS_SCREEN_STATUS:
      return action.tagsScreenState;
    default:
      return state;
  }
}
