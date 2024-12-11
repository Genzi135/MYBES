// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import blogReducer from './blogSlice';
import commentReducer from './commentSlice';
import profileReducer from './profileSlice';

const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer,
    comment: commentReducer,
    profile: profileReducer,
});

export default rootReducer;
