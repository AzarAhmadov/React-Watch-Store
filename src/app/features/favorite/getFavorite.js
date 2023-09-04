import { createSlice } from '@reduxjs/toolkit';

const getFavorite = createSlice({
    name: 'product',
    initialState: {
        favorites: [],
        selectedProduct: [],
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const id = action.payload;
            if (state.favorites.includes(id)) {
                state.favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
            } else {
                state.favorites = [...state.favorites, id];
            }
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
        },
    },
});

export const { toggleFavorite, setSelectedProduct } = getFavorite.actions;

export default getFavorite.reducer;