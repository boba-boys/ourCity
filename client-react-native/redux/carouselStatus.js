
// action types
const GOT_CarouselStatus = "GOT_CarouselStatus";

// action creators
const _getCarouselStatus = (status) => {
  return {
    type: GOT_CarouselStatus,
    carouselStatus: status,
  };
};

// thunks
export const getCarouselStatus = (carouselStatus) => async (dispatch) => {
  try {
   const newStatus = !carouselStatus
    dispatch(_getCarouselStatus(newStatus));
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function carouselStatus(state = false, action) {
  switch (action.type) {
    case GOT_CarouselStatus:
      return action.carouselStatus;
    default:
      return state;
  }
}
