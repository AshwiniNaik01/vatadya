import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchTreks, fetchFilteredTreks } from '../../api/trekApi';

// Async thunk to fetch treks
export const fetchTreksAsync = createAsyncThunk(
    'treks/fetchTreks',
    async () => {
        const response = await fetchTreks();
        if (response && response.data && Array.isArray(response.data)) {
            return response.data;
        } else if (Array.isArray(response)) {
            return response;
        }
        return response.data || [];
    }
);

// Async thunk to fetch filtered treks
export const fetchFilteredTreksAsync = createAsyncThunk(
    'treks/fetchFilteredTreks',
    async (categoryId) => {
        const response = await fetchFilteredTreks(categoryId);
        if (response && response.data && Array.isArray(response.data)) {
            return response.data;
        } else if (Array.isArray(response)) {
            return response;
        }
        return response.data || [];
    }
);

const trekSlice = createSlice({
    name: 'treks',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        updateTrekWishlistStatus: (state, action) => {
            const { trekId, isWishlisted } = action.payload;
            const trek = state.items.find(t => t._id === trekId);
            if (trek) {
                trek.isWishlisted = isWishlisted;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTreksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTreksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const priority = { 'Upcoming': 1, 'Ongoing': 2, 'Completed': 3 };
                state.items = [...action.payload].sort((a, b) => {
                    const pA = priority[a.status] || 4;
                    const pB = priority[b.status] || 4;
                    return pA - pB;
                });
            })
            .addCase(fetchTreksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchFilteredTreksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredTreksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const priority = { 'Upcoming': 1, 'Ongoing': 2, 'Completed': 3 };
                state.items = [...action.payload].sort((a, b) => {
                    const pA = priority[a.status] || 4;
                    const pB = priority[b.status] || 4;
                    return pA - pB;
                });
            })
            .addCase(fetchFilteredTreksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { updateTrekWishlistStatus } = trekSlice.actions;

export const selectAllTreks = (state) => state.treks.items;

export const selectUpcomingTreks = createSelector(
    [selectAllTreks],
    (treks) => treks.filter((trek) => !trek.status || trek.status === 'Upcoming')
);

export default trekSlice.reducer;
