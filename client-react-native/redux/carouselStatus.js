
// action types
const GOT_CAROUSEL_STATUS = "GOT_CAROUSEL_STATUS";

// action creators
const _gotCarouselStatus = (status) => {
  return {
    type: GOT_CAROUSEL_STATUS,
    carouselState: status,
  };
};

// thunks
export const getStatus = (currentStatus) => async (dispatch) => {
  try {
    let newStatus=!currentStatus;
    dispatch(_gotCarouselStatus(newStatus));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function carouselStatus(state = false, action) {
  switch (action.type) {
    case GOT_CAROUSEL_STATUS:
      return action.carouselState;
    default:
      return state;
  }
}
