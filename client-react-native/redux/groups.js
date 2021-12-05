import axios from "axios";
// const TOKEN = "token"; // For the mobile token

// action types
const GOT_GROUPS = "GOT_GROUPS";
const CREATE_GROUP = "CREATE_GROUP";

// action creators
const _gotGroups = (groups) => {
  return {
    type: GOT_GROUPS,
    groupsArr: groups,
  };
};

const _createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group: group,
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

export const createGroup = (group) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://my-city-server.herokuapp.com/api/create",
      group
    );
    dispatch(_createGroup(response.data));
  } catch (err) {
    console.log(err);
    return {};
  }
};

// Reducer
export default function groups(state = [], action) {
  switch (action.type) {
    case GOT_GROUPS:
      return action.groupsArr;
    case CREATE_GROUP:
      return [...state, action.group];
    default:
      return state;
  }
}
