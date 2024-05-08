import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  light: "light",
  dark: "dracula",
};

const getPreferredTheme = () => {
  const preferredTheme =
    localStorage.getItem("comfy-store-theme") || themes.light;
  document.documentElement.setAttribute("data-theme", preferredTheme);
  return preferredTheme;
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("comfy-store-user");
  return user ? JSON.parse(user) : null;
};

const getShippingAddress = () => {
  const address =
    localStorage.getItem("comfy-store-address") || "Ashlyn, Texas, US";
  return address;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getPreferredTheme(),
  shippingAddress: getShippingAddress(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { token: action.payload.jwt, ...action.payload.user };
      state.user = user;
      localStorage.setItem("comfy-store-user", JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("comfy-store-user");
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {
      const { light, dark } = themes;
      state.theme = state.theme === light ? dark : light;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("comfy-store-theme", state.theme);
    },
    changeShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("comfy-store-address", state.shippingAddress);
    },
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser, toggleTheme, changeShippingAddress } =
  userSlice.actions;
