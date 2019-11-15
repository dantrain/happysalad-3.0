import { createSlice } from 'redux-starter-kit';

const { actions, reducer } = createSlice({
  name: 'player',
  initialState: {
    url: null,
    playing: false,
  },
  reducers: {
    playUrl: (state, { payload }) => {
      state.url = payload;
      state.playing = true;
    },
    togglePlay: state => {
      if (state.url) {
        state.playing = !state.playing;
      }
    },
    pause: state => {
      state.playing = false;
    },
    close: state => {
      state.playing = false;
      state.url = null;
    },
  },
});

export const { playUrl, togglePlay, pause, close } = actions;

export default reducer;
