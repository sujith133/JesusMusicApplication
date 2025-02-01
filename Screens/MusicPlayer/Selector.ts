import { createSelector } from 'reselect';

// Base state selector
const selectState = (state) => state.state;

// Memoized selectors
export const selectSongData = createSelector(
  [selectState],
  (state) => state.songData
);

export const selectValue = createSelector(
  [selectState],
  (state) => state.value
);
