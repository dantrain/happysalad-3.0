import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'mobileMenu',
  initialState: { open: false },
  reducers: {
    toggle: state => {
      state.open = !state.open;
    },
    close: state => {
      state.open = false;
    },
  },
});

export const { toggle, close } = actions;

export default reducer;
