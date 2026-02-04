import { configureStore } from '@reduxjs/toolkit';
import trekReducer from './slices/trekSlice';

export const store = configureStore({
    reducer: {
        treks: trekReducer,
    },
});
