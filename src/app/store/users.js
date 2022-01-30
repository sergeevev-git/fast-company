import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import usersService from "../services/users.service";
import { generateAuthError } from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersRecieved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userUpdateSuccessed: (state, action) => {
            const elementIndex = state.entities.findIndex(
                (el) => el._id === state.auth.userId
            );
            state.entities[elementIndex] = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersRecieved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userUpdateSuccessed,
    userLoggedOut,
    authRequested
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const updateUserRequested = createAction("users/updateUserRequested");
const updateUserFailed = createAction("users/updateUserFailed");

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else dispatch(authRequestFailed(error.message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await usersService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const updateUser = (payload) => async (dispatch) => {
    dispatch(updateUserRequested());
    try {
        const { content } = await usersService.update(payload);
        dispatch(userUpdateSuccessed(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(updateUserFailed(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await usersService.get();
        dispatch(usersRecieved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === userId);
    }
};

export const getUsersList = () => (state) => state.users.entities;

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export const getDataStatus = () => (state) => state.users.dataLoaded;

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getCurrentUserId = () => (state) => state.users.auth.userId;

export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(
              (user) => user._id === state.users.auth.userId
          )
        : null;
};

export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
