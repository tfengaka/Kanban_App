import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/authSlice';
import boardReducer from './features/boardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
});
