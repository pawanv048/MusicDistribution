import TrackPlayer from 'react-native-track-player';

export const playTrack = async (track) => {
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  await TrackPlayer.play();
};

export const pauseTrack = async () => {
  await TrackPlayer.pause();
};

export const getTrackInfo = async () => {
  const state = await TrackPlayer.getState();
  const currentTrack = await TrackPlayer.getCurrentTrack();
  const trackObject = await TrackPlayer.getTrack(currentTrack);
  const position = await TrackPlayer.getPosition();
  const duration = await TrackPlayer.getDuration();

  return {
    state,
    trackObject,
    position,
    duration
  };
};

// Skip to a specific track index
export const skipToIndex = async (index) => {
  await TrackPlayer.skip(index);
};

// Skip to the next track in the queue
export const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};

// Skip to the previous track in the queue
export const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

// Remove tracks from the queue
export const removeTracks = async (indexes) => {
  await TrackPlayer.remove(indexes);
};

// Retrieve the track objects in the queue
export const getQueue = async () => {
  const tracks = await TrackPlayer.getQueue();
  return tracks;
};
