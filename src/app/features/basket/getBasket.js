import { createSlice } from '@reduxjs/toolkit';

const getBasketFromLocalStorage = () => {
  const basketData = localStorage.getItem('basket');
  return basketData ? JSON.parse(basketData) : { items: [] };
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: getBasketFromLocalStorage(),
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('basket', JSON.stringify(state));
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('basket', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
        localStorage.setItem('basket', JSON.stringify(state));
      }
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } = basketSlice.actions;
export default basketSlice.reducer;
