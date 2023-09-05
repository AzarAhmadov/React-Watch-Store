import { createSlice } from '@reduxjs/toolkit';

const getBasketFromLocalStorage = () => {
  const basketData = localStorage.getItem('basket');
  return basketData ? JSON.parse(basketData) : {
    items: []
  };
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: getBasketFromLocalStorage(),
  reducers: {
    addToBasket: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem('basket', JSON.stringify(state));
    },

    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      const updatedItems = state.items.filter(item => item.id !== id);
      state.items = updatedItems;
      localStorage.setItem('basket', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
        const newBasket = {
          ...state
        };
        localStorage.setItem('basket', JSON.stringify(newBasket));
      }
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } = basketSlice.actions;
export default basketSlice.reducer;