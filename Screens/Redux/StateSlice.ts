import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  value: 0,
  userId: '',
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

    // Set userId
    setId: (state, action) => {
      state.userId = action.payload; // Update userId with the payload
    },
  },
});

// Export actions and reducer
export const { increment, decrement, setValue, setId } = stateSlice.actions;
export default stateSlice.reducer;
