import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserFromCookie = () => {
  const userCookie = Cookies.get("user");
  if (!userCookie || userCookie === "undefined") return null;
  try {
    return JSON.parse(userCookie);
  } catch (e) {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!Cookies.get("token"),
    user: getUserFromCookie(),
    isLoginModalOpen: false,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
      if (!action.payload) {
        state.user = null;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    logout: (state) => {
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("email");
      Cookies.remove("user");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setLoginState, setUser, openLoginModal, closeLoginModal, logout } = authSlice.actions;
export default authSlice.reducer;
