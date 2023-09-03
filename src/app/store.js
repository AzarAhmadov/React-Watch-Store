import { configureStore } from '@reduxjs/toolkit'
import getFavorite from './features/favorite/getFavorite';
import getBasket from './features/basket/getBasket';
import getCart from './features/Cart/getCart';
import Short from './features/short/Short';

export const store = configureStore({
  reducer: {
    product: getFavorite,
    basket: getBasket,
    toggle: getCart,
    sort: Short
  },
})