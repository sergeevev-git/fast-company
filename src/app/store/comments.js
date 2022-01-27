import { createAction, createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecieved,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

const commentCreatedFailed = createAction("comments/commentCreatedFailed");
const commentRemovedFailed = createAction("comments/commentRemovedFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentsService.getComments(userId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const createComment = (payload) => async (dispatch) => {
    try {
        const { content } = await commentsService.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreatedFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    try {
        // const { content } = await commentsService.removeComment(commentId);
        await commentsService.removeComment(commentId);
        dispatch(commentRemoved(commentId));
    } catch (error) {
        dispatch(commentRemovedFailed(error.message));
    }
};

export default commentsReducer;
