import axios from "axios";

// action types
const GOT_COMMENTS = "GOT_COMMENTS";

// action creators
const _gotComments = (comments) => {
    return {
        type: GOT_COMMENTS,
        commentsArr: comments,
    };
};

// thunks
export const getComments = ({groupId, tagId}) => async (dispatch) => {
    try {
        console.log(tagId,groupId,'-----------------');
        const response = await axios.get(
            `https://my-city-server.herokuapp.com/api/tags/comments/${tagId}/${groupId}`
        );
        console.log("Comments from the server store in allComment", response.data);
        const refinedComments = response.data.map((comment) => {
            return {
                id: comment.id,
                body: comment.description,
                userWhoCommented: comment.user.firstName,
                userIdWhoCommented: comment.user.id,
                userPic: comment.user.imageUrl,
                createdAt: comment.user.createdAt,
            };
        });
        dispatch(_gotComments(refinedComments));
    } catch (err) {
        console.log('Problem getting comments :( ',err);
        return [];
    }
};

// Reducer
export default function allComments(state = [], action) {
    switch (action.type) {
        case GOT_COMMENTS:
            return action.commentsArr;
        default:
            return state;
    }
}
