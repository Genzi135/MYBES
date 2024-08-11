import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from '../features/rootReducer';

// Create and export the Redux store
export const store = configureStore({
    reducer: rootReducer,
});

// Define a hook for using dispatch
export const useAppDispatch = () => useDispatch();
