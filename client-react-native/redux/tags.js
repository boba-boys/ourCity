import axios from "axios";
// const TOKEN = "token"; // For the mobile token

// action types
const GOT_TAGS = "GOT_TAGS";

// action creators
const _gotTags = (tags) => {
  return {
    type: GOT_TAGS,
    tagsArr: tags,
  };
};

// thunks
export const getTags = (groupId) => async (dispatch) => {
  try {

    const response = await axios.get(
      `https://my-city-server.herokuapp.com/api/tags/${groupId}`
      // `http://localhost:1337//api/tags/${groupId}`
    );

    dispatch(_gotTags(response.data));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function tags(state = [], action) {
  switch (action.type) {
    case GOT_TAGS:
      return action.tagsArr;
    default:
      return state;
  }
}
