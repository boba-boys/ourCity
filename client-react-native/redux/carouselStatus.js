
// action types
<<<<<<< HEAD
const GOT_CAROUSEL_STATUS = "GOT_CAROUSEL_STATUS";

// action creators
const _gotCarouselStatus = (status) => {
  return {
    type: GOT_CAROUSEL_STATUS,
    carouselState: status,
=======
const GOT_CarouselStatus = "GOT_CarouselStatus";

// action creators
const _getCarouselStatus = (status) => {
  return {
    type: GOT_CarouselStatus,
    carouselStatus: status,
>>>>>>> master
  };
};

// thunks
<<<<<<< HEAD
export const getStatus = (currentStatus) => async (dispatch) => {
  try {
    let newStatus=!currentStatus;
    dispatch(_gotCarouselStatus(newStatus));
=======
export const getCarouselStatus = (carouselStatus) => async (dispatch) => {
  try {
   const newStatus = !carouselStatus
    dispatch(_getCarouselStatus(newStatus));
>>>>>>> master
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Reducer
export default function carouselStatus(state = false, action) {
  switch (action.type) {
<<<<<<< HEAD
    case GOT_CAROUSEL_STATUS:
      return action.carouselState;
=======
    case GOT_CarouselStatus:
      return action.carouselStatus;
>>>>>>> master
    default:
      return state;
  }
}
