import { createSlice } from "@reduxjs/toolkit";
import professionsService from "../services/professions.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;

const { professionsRequested, professionsRecieved, professionsRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    } else return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionsService.fetchAll();
            dispatch(professionsRecieved(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;

export const getProfessionById = (professionId) => (state) => {
    return state.professions.entities.find((prof) => prof._id === professionId);
};

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionsByIds = (professionsIds) => (state) => {
    if (state.professions.entities) {
        const professionsArray = [];
        for (const profId of professionsIds) {
            for (const profession of state.professions.entities) {
                if (profession._id === profId) {
                    professionsArray.push(profession);
                    break;
                }
            }
        }
        return professionsArray;
    }
    return [];
};

export default professionsReducer;
