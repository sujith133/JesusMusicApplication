import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  value: 0,
  playerPrevValue: 0,
  userId: '',
  playerView:false,
  playerState:'none',
  songData:{},
};

// Slice
const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    // Increment the value
    increment: (state) => {
      state.value += 1;
    },

    // Decrement the value
    decrement: (state) => {
      state.value -= 1;
    },

    // Set a specific value
    setValue: (state, action) => {
      state.value = action.payload; // Update the value with the payload
    },

    setPrevValue: (state, action) => {
      state.playerPrevValue = action.payload; // Update the value with the payload
    },

    // Set userId
    setId: (state, action) => {
      state.userId = action.payload; // Update userId with the payload
    },
    setPlayerStatus: (state, action) => {
      state.playerState = action.payload; // Update player with the payload off(0) playing(1) pause(2), 
    },
    setSongQueue: (state, action) => {
      state.songData = action.payload; // Update player with the payload off(0) playing(1) pause(2), 
    },
    setPlayerView: (state, action) => {
      state.playerView = action.payload; // Update player with the payload off(0) playing(1) pause(2), 
    }
  },
});

// Export actions and reducer
export const { increment, decrement, setValue, setId,setPlayerStatus,setSongQueue,setPrevValue,setPlayerView } = stateSlice.actions;
export default stateSlice.reducer;
