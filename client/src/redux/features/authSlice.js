import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {} };

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
