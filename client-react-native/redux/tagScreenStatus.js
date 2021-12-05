
// action types
const GOT_TAG_SCREEN_STATUS = "GOT_TAG_SCREEN_STATUS";

// action creators
const _gotTagScreenStatus = (status) => {
    return {
        type: GOT_TAG_SCREEN_STATUS,
        tagScreenState: status,
    };
};

// thunks
export const getTagScreenStatus = (currentStatus) => async (dispatch) => {
    try {
        let newStatus = !currentStatus;
        dispatch(_gotTagScreenStatus(newStatus));
    } catch (err) {
        console.log(err);
        return [];
    }
};

// Reducer
export default function tagScreenStatus(state = false, action) {
    switch (action.type) {
        case GOT_TAG_SCREEN_STATUS:
            return action.tagScreenState;
        default:
            return state;
    }
}
