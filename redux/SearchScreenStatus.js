const SEARCH_SCREEN_STATUS = "SEARCH_SCREEN_STATUS";

// action creators
const setStatus = (status) => {
    return {
        type: SEARCH_SCREEN_STATUS,
        searchScreenStatus: status,
    };
};

// thunks
export const setSearchScreenStatus = (currentStatus) => async (dispatch) => {
    try {
        let newStatus = !currentStatus;
        dispatch(setStatus(newStatus));
    } catch (err) {
        console.log(err);
        return [];
    }
};

// Reducer
export default function searchScreenStatus(state = false, action) {
    switch (action.type) {
        case SEARCH_SCREEN_STATUS:
            return action.searchScreenStatus;
        default:
            return state;
    }
}
