import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../api/wishlistApi";
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
  },
);

// Toggle wishlist
export const toggleWishlistAsync = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (
    { trekId, stayId = null, isWishlisted, trekData = null },
    { dispatch, rejectWithValue },
  ) => {
    try {
      if (isWishlisted) {
        await removeFromWishlist({ trekId, stayId });
      } else {
        await addToWishlist({ trekId, stayId });
      }
      // Update trek state immediately for better UX
      dispatch(
        updateTrekWishlistStatus({ trekId, isWishlisted: !isWishlisted }),
      );
      return {
        trekId,
        stayId,
        isWishlisted: !isWishlisted,
        itemData: trekData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // list of objects { _id, trek: { ... } }
    trekIds: [], // list of trek IDs for status checks
    stayIds: [],
    status: "idle", // idle | loading | succeeded | failed
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
        state.trekIds = action.payload
          .filter((item) => item.item)
          .map((item) => item.item._id);

        state.stayIds = action.payload
          .filter((item) => item.stay)
          .map((item) => item.stay._id);
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
      //   const { trekId, stayId, isWishlisted, itemData } = action.payload;

      //   if (trekId) {
      //     if (isWishlisted) {
      //       if (!state.trekIds.includes(trekId)) {
      //         state.trekIds.push(trekId);
      //       }
      //     } else {
      //       state.trekIds = state.trekIds.filter((id) => id !== trekId);
      //     }
      //   }

      //   if (stayId) {
      //     if (isWishlisted) {
      //       if (!state.stayId.includes(stayId)) {
      //         state.stayId.push(stayId);
      //       }
      //     } else {
      //       state.stayId = state.stayId.filter((id) => id !== stayId);
      //     }
      //   }
      // });
      .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
        const { trekId, stayId, isWishlisted, itemData } = action.payload;

        // ✅ TREK HANDLING
        if (trekId) {
          if (isWishlisted) {
            if (!state.trekIds.includes(trekId)) {
              state.trekIds.push(trekId);
            }

            // ✅ add to items (instant UI)
            state.items.push({
              item: itemData,
            });
          } else {
            state.trekIds = state.trekIds.filter((id) => id !== trekId);

            // ✅ remove from items
            state.items = state.items.filter((i) => i.item?._id !== trekId);
          }
        }

        // ✅ STAY HANDLING
        if (stayId) {
          if (isWishlisted) {
            if (!state.stayIds.includes(stayId)) {
              state.stayIds.push(stayId);
            }

            state.items.push({
              stay: itemData,
            });
          } else {
            state.stayIds = state.stayIds.filter((id) => id !== stayId);

            state.items = state.items.filter((i) => i.stay?._id !== stayId);
          }
        }
      });
  },
});

export const selectWishlistIds = (state) => state.wishlist.trekIds;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistData = (state) => state.wishlist.items;
export const selectStayWishlistIds = (state) => state.wishlist.stayIds;

export default wishlistSlice.reducer;
