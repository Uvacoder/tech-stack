import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { githubAPI } from './github/github.api';
import stackSlice from '../components/Stack/stackSlice';

const store = configureStore({
  reducer: {
    [githubAPI.reducerPath]: githubAPI.reducer,
    stackSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
