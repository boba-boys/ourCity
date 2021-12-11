import axios from "axios";

// const TOKEN = "token"; // For the mobile token

// action types
const GOT_USER = "GOT_USER";

// action creators
const _gotUser = (user) => {
  return {
    type: GOT_USER,
    user: user,
  };
};

// thunks
export const loadUserToState = (email) => async (dispatch) => {
  try {
    const user = await axios.post(
      `https://my-city-server.herokuapp.com/api/users`,
      { email }
    );
    dispatch(_gotUser(user.data));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function users(state = {}, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    default:
      return state;
  }
}
