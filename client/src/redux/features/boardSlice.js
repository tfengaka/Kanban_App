import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBoards } = boardSlice.actions;

export default boardSlice.reducer;
