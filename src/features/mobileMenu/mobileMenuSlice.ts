import { createSlice } from '@reduxjs/toolkit';

type MobileMenuState = {
  open: boolean;
};

const { actions, reducer } = createSlice({
  name: 'mobileMenu',
  initialState: { open: false } as MobileMenuState,
  reducers: {
    toggle: (state): void => {
      state.open = !state.open;
    },
    close: (state): void => {
      state.open = false;
    },
  },
});

export const { toggle, close } = actions;

export default reducer;
