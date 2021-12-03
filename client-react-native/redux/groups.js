import axios from "axios";
// const TOKEN = "token"; // For the mobile token

// action types
const GOT_GROUPS = "GOT_GROUPS";

// action creators
const _gotGroups = (groups) => {
  return {
    type: GOT_GROUPS,
    groupsArr: groups,
  };
};

// thunks
export const getGroups = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://my-city-server.herokuapp.com/api/groups/${userId}`
    );
    dispatch(_gotGroups(response.data));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function groups(state = [], action) {
  switch (action.type) {
    case GOT_GROUPS:
      return action.groupsArr;
    default:
      return state;
  }
}
