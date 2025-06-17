import { configureStore } from '@reduxjs/toolkit';

const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer, // ✅ 더미 reducer 하나라도 넣기
  },
});

