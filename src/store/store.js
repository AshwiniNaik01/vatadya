import { configureStore } from '@reduxjs/toolkit';
import trekReducer from './slices/trekSlice';
import wishlistReducer from './slices/wishlistSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        treks: trekReducer,
        wishlist: wishlistReducer,
        auth: authReducer,
    },
});
