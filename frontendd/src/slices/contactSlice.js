import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        loading: false,
        contactMessages: [],
        error: null,
        isMessageSent: false,
        isMessageDeleted: false
    },
    reducers: {
        createContactRequest(state) {
            state.loading = true;
            state.isMessageSent = false;
        },
        createContactSuccess(state, action) {
            state.loading = false;
            state.isMessageSent = true;
        },
        createContactFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        adminContactMessageRequest(state) {
            state.loading = true;
        },
        adminContactMessageSuccess(state, action) {
            state.loading = false;
            state.contactMessages = action.payload.contactMessages;
        },
        adminContactMessageFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteContactMessageRequest(state) {
            state.loading = true;
            state.isMessageDeleted = false;
        },
        deleteContactMessageSuccess(state) {
            state.loading = false;
            state.isMessageDeleted = true;
        },
        deleteContactMessageFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        clearMessageSent(state) {
            state.isMessageSent = false;
        }
    }
});

export const {
    createContactRequest,
    createContactSuccess,
    createContactFail,
    adminContactMessageRequest,
    adminContactMessageSuccess,
    adminContactMessageFail,
    deleteContactMessageRequest,
    deleteContactMessageSuccess,
    deleteContactMessageFail,
    clearError,
    clearMessageSent
} = contactSlice.actions;

export default contactSlice.reducer;