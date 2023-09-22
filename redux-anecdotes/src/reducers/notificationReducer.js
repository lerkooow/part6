import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload;
        },
        clearNotification: (state) => {
            return '';
        },
    },
});

export const displayNotification = (text, seconds) => {
    return (dispatch) => {
        dispatch(setNotification(text));
        setTimeout(() => {
            dispatch(clearNotification());
        }, seconds * 1000);
    };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;