import { createSlice } from 'redux-starter-kit';

const { actions, reducer } = createSlice({
  name: 'infiniteScroll',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});

export const { increment, decrement } = actions;

export default reducer;
