import { createSlice } from '@reduxjs/toolkit';

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
