import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Load cart items from localStorage (if available)
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cartItems');
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
    return [];
  } catch (e) {
    console.error("Could not load cart items from localStorage", e);
    return [];
  }
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: loadCartFromLocalStorage(), // Initialize with data from localStorage
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', serializedCart);
  } catch (e) {
    console.error("Could not save cart items to localStorage", e);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Omit<CartItem, "qty">>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }
      saveCartToLocalStorage(state.cartItems); // Save updated state to localStorage
    },
    removeItemfromCart: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      saveCartToLocalStorage(state.cartItems); // Save updated state to localStorage
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage([]); // Clear cart from localStorage
    },
  },
});

export const { addItemToCart, removeItemfromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
