import TrackPlayer, { Event } from 'react-native-track-player';

const trackPlayerServices = async (): Promise<void> => {
  // Adding a listener for the playback state changes
  TrackPlayer.addEventListener(Event.PlaybackState, (state) => {
    console.log('Playback state changed:', state);
  });

  // Remote events for handling controls
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log('No next track available:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log('No previous track available:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.reset(); // Stop and clean up the player
  });

  // Handling remote seek (if applicable)
  TrackPlayer.addEventListener(Event.RemoteSeek, (data) => {
    TrackPlayer.seekTo(data.position);
  });

  // Error logging for debugging
  TrackPlayer.addEventListener(Event.PlaybackError, (error) => {
    console.error('An error occurred during playback:', error);
  });
};

export default trackPlayerServices;
