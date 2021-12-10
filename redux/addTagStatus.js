const ADD_TAGS_STATUS = "ADD_TAGS_STATUS";

// action creators
const _addTags = (status) => {
    return {
        type: ADD_TAGS_STATUS,
        addTagsState: status,
    };
};

// thunks
export const addTagStatusFunc = (currentStatus) => async (dispatch) => {
    try {
        let newStatus = !currentStatus;
        dispatch(_addTags(newStatus));
    } catch (err) {
        console.log(err);
        return [];
    }
};

// Reducer
export default function addTagsStatus(state = false, action) {
    switch (action.type) {
        case ADD_TAGS_STATUS:
            return action.addTagsState;
        default:
            return state;
    }
}
