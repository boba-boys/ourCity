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
    console.log(email)
    const user = await axios.get(
      `https://my-city-server.herokuapp.com/api/users`, {email:email}
      );
      console.log(user, 'yasssss')
    dispatch(_gotUser(user));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function users(state = '', action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    default:
      return state;
  }
}
