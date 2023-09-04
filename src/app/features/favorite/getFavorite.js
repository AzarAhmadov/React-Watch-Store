import { createSlice } from '@reduxjs/toolkit';

const getFavoritesFromLocalStorage = () => {
  const favoritesData = localStorage.getItem('favorites');
  const selectedProductData = localStorage.getItem('selectedProduct');
  
  const favorites = favoritesData ? JSON.parse(favoritesData) : [];
  const selectedProduct = selectedProductData ? JSON.parse(selectedProductData) : [];

  return { favorites, selectedProduct };
};

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const saveSelectedProductToLocalStorage = (selectedProduct) => {
  localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
};

const favoriteSlice = createSlice({
  name: 'product',
  initialState: getFavoritesFromLocalStorage(),
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
      } else {
        state.favorites = [...state.favorites, id];
      }
      saveFavoritesToLocalStorage(state.favorites);
    },
    setSelectedProduct: (state, action) => {
      const existingProduct = state.selectedProduct.find((product) => product.id === action.payload.id);
      if (existingProduct) {
        state.selectedProduct = state.selectedProduct.filter((product) => product.id !== action.payload.id);
      } else {
        state.selectedProduct.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          img: action.payload.img,
        });
      }
      saveSelectedProductToLocalStorage(state.selectedProduct);
    },
  },
});

export const { toggleFavorite, setSelectedProduct } = favoriteSlice.actions;
export default favoriteSlice.reducer;
