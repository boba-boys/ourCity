import axios from "axios";

// action types
const GOT_SINGLE_TAG = "GOT_SINGLE_TAG";

// action creators
const _gotSingleTag = (tag) => {
    return {
        type: GOT_SINGLE_TAG,
        tagObj: tag,
    };
};

// thunks
export const getTagDetails = (tagId) => async (dispatch) => {
    try {

        const response = await axios.get(
            `https://my-city-server.herokuapp.com/api/tags/${tagId}`
            // `http://localhost:1337//api/tags/${tagId}`
        );
        dispatch(_gotSingleTag(response.data));
    } catch (err) {
        console.log(err);
        return {};
    }
};

// Reducer
export default function tagDetails(state = {}, action) {
    switch (action.type) {
        case GOT_SINGLE_TAG:
            return action.tagObj;
        default:
            return state;
    }
}
