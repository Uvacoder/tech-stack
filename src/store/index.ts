import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { githubAPI } from './github/github.api';

const store = configureStore({
  reducer: {
    [githubAPI.reducerPath]: githubAPI.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
