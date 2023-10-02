import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
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
      const { product } = action.payload;
      const selectedItem = state.cartItems.find((item) => {
        return item.cartID === product.cartID;
      });
      if (selectedItem) {
        selectedItem.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to the cart");
    },

    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const selectedItem = state.cartItems.find((item) => {
        return item.cartID === cartID;
      });
      state.cartItems = state.cartItems.filter((item) => {
        return item.cartID !== cartID;
      });
      state.numItemsInCart -= selectedItem.amount;
      state.cartTotal -= selectedItem.amount * selectedItem.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from the cart");
    },

    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const selectedItem = state.cartItems.find((item) => {
        return item.cartID === cartID;
      });
      const difference = amount - selectedItem.amount;
      selectedItem.amount = amount;
      state.numItemsInCart += difference;
      state.cartTotal += difference * selectedItem.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Updated the cart");
    },

    clearCart: (state) => {
      localStorage.setItem("comfy-store-cart", JSON.stringify(defaultState));
      return defaultState;
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("comfy-store-cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;
