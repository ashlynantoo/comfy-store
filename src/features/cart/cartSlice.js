import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  subTotal: 0,
  shippingFee: 500,
  tax: 0,
  total: 0,
};

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("comfy-store-cart");
  return JSON.parse(cart);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage() || defaultState,
  reducers: {
    addItem: (state, action) => {
      const cartItem = action.payload;
      const selectedItem = state.cartItems.find((item) => {
        return item.cartID === cartItem.cartID;
      });
      if (selectedItem) {
        selectedItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
      state.numItemsInCart += cartItem.quantity;
      state.subTotal += cartItem.quantity * cartItem.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to the cart");
    },

    removeItem: (state, action) => {
      const cartID = action.payload;
      const selectedItem = state.cartItems.find((item) => {
        return item.cartID === cartID;
      });
      state.cartItems = state.cartItems.filter((item) => {
        return item.cartID !== cartID;
      });
      state.numItemsInCart -= selectedItem.quantity;
      state.subTotal -= selectedItem.quantity * selectedItem.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from the cart");
    },

    editItem: (state, action) => {
      const { cartID, quantity } = action.payload;
      const selectedItem = state.cartItems.find((item) => {
        return item.cartID === cartID;
      });
      const difference = quantity - selectedItem.quantity;
      selectedItem.quantity = quantity;
      state.numItemsInCart += difference;
      state.subTotal += difference * selectedItem.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Updated the cart");
    },

    clearCart: (state) => {
      localStorage.setItem("comfy-store-cart", JSON.stringify(defaultState));
      return defaultState;
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.subTotal;
      state.total = state.subTotal + state.tax + state.shippingFee;
      localStorage.setItem("comfy-store-cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;
