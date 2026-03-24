import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist, fetchWishlist } from "../../api/wishlistApi";
import { updateTrekWishlistStatus } from "./trekSlice";

// Fetch wishlist from backend
export const fetchWishlistAsync = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWishlist();
      if (response.success) {
        return response.data; // Now returning the full data array
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Toggle wishlist
export const toggleWishlistAsync = createAsyncThunk(
  "wishlist/toggleWishlist",
  async ({ trekId, isWishlisted, trekData = null }, { dispatch, rejectWithValue }) => {
    try {
      if (isWishlisted) {
        await removeFromWishlist(trekId);
      } else {
        await addToWishlist(trekId);
      }
      // Update trek state immediately for better UX
      dispatch(updateTrekWishlistStatus({ trekId, isWishlisted: !isWishlisted }));
      return { trekId, isWishlisted: !isWishlisted, trekData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],         // list of objects { _id, trek: { ... } }
    trekIds: [],       // list of trek IDs for status checks
    status: "idle",    // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.trekIds = action.payload.map(item => item.trek?._id || item.trek);
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
        const { trekId, isWishlisted, trekData } = action.payload;
        if (isWishlisted) {
          if (!state.trekIds.includes(trekId)) {
            state.trekIds.push(trekId);
            // If we have trekData (e.g. from the page where we toggled), we can add it to items
            if (trekData) {
               state.items.push({ trek: trekData });
            }
          }
        } else {
          state.trekIds = state.trekIds.filter(id => id !== trekId);
          state.items = state.items.filter(item => (item.trek?._id || item.trek) !== trekId);
        }
      });
  }
});

export const selectWishlistIds = (state) => state.wishlist.trekIds;
export const selectWishlistItems = (state) => state.wishlist.items;

export default wishlistSlice.reducer;