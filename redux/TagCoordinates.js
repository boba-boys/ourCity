const TAG_COORDINATES = "TAG_COORDINATES";

// action creators
const _addTagCoordinates = (coordinates) => {
    return {
        type: TAG_COORDINATES,
        createdTagCoordinates: coordinates,
    };
};

// thunks
export const addTagCoordinatesFunc = (coordinates) => async (dispatch) => {
    try {
        dispatch(_addTagCoordinates(coordinates));
    } catch (err) {
        console.log(err);
        return [];
    }
};

// Reducer
export default function addTagCoordinates(state = {}, action) {
    switch (action.type) {
        case TAG_COORDINATES:
            return action.createdTagCoordinates;
        default:
            return state;
    }
}
