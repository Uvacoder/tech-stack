import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { IRepo } from '../../store/github/github.types';

interface IStackState {
  stackList: IRepo[];
}

const initialState: IStackState = {
  stackList: [],
};

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    addToStack: (state, action: PayloadAction<IRepo>) => {
      state.stackList.push(action.payload);
    },
    removeFromStack: (state, action: PayloadAction<IRepo>) => {
      state.stackList = state.stackList.filter(
        (item) => item !== action.payload
      );
    },
    clearStack: (state) => {
      state.stackList = [];
    },
  },
});

export const stackActions = stackSlice.actions;

export const selectStack = (state: RootState) => state.stackSlice.stackList;

export default stackSlice.reducer;
