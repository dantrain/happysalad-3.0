import { createSlice } from 'redux-starter-kit';

const { actions, reducer } = createSlice({
  name: 'player',
  initialState: {
    url: null,
    title: null,
    playing: false,
  },
  reducers: {
    playTrack: (state, { payload: { url, title } }) => {
      state.url = url;
      state.title = title;
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
      state.title = null;
    },
  },
});

export const { playTrack, togglePlay, pause, close } = actions;

export default reducer;
