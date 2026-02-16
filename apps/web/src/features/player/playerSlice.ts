import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerTrack {
  url: string | null;
  title: string | null;
}

type PlayerState = {
  playing: boolean;
} & PlayerTrack;

const { actions, reducer } = createSlice({
  name: 'player',
  initialState: {
    url: null,
    title: null,
    playing: false,
  } as PlayerState,
  reducers: {
    playTrack: (
      state,
      { payload: { url, title } }: PayloadAction<PlayerTrack>,
    ) => {
      state.url = url;
      state.title = title;
      state.playing = true;
    },
    togglePlay: (state) => {
      if (state.url) {
        state.playing = !state.playing;
      }
    },
    pause: (state) => {
      state.playing = false;
    },
    close: (state) => {
      state.playing = false;
      state.url = null;
      state.title = null;
    },
  },
});

export const { playTrack, togglePlay, pause, close } = actions;

export default reducer;
