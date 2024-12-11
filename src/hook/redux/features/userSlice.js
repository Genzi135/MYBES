
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    login: false,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        clearEmail(state) {
            state.email = null;
        },
        setLogin(state) {
            state.login = true;
        },
        setLogOut(state) {
            state.login = false;
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setColor(state, action) {
            state.user.color = action.payload
        }
    },
});

export const { setEmail, clearEmail, setLogin, setLogOut, setUser, setColor } = userSlice.actions;

export default userSlice.reducer;
