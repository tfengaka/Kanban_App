import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
