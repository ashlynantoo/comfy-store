import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  light: "light",
  dark: "dracula",
};

const getPreferredTheme = () => {
  const preferredTheme = localStorage.getItem("theme") || themes.light;
  document.documentElement.setAttribute("data-theme", preferredTheme);
  return preferredTheme;
};

const geUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: geUserFromLocalStorage(),
  theme: getPreferredTheme(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { token: action.payload.jwt, ...action.payload.user };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {
      const { light, dark } = themes;
      state.theme = state.theme === light ? dark : light;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
