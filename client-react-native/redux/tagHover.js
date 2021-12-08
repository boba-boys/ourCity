import axios from "axios";
// const TOKEN = "token"; // For the mobile token

// action types
const GOT_HOVER_TAG = "GOT_HOVER_TAG";

// action creators
const _gotHoverTag = (tagId) => {
  return {
    type: GOT_HOVER_TAG,
    hoverTag: tagId,
  };
};

// thunks
export const HoverTagFunc = (hoverStatus) => async (dispatch) => {
  try {
      dispatch(_gotHoverTag(hoverStatus));
  } catch (err) {
      console.log(err);
      return [];
  }
};

// Reducer
export default function hoverTag(state = 0, action) {
  switch (action.type) {
    case GOT_HOVER_TAG:
      return action.hoverTag;
    default:
      return state;
  }
}
