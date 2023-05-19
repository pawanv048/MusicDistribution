import TrackPlayer, {State} from 'react-native-track-player';

// export const playTrack = async (track) => {
//   //console.log('Playing track:', track);
//   try {
//     ////console.log('Playing track:', topTrackSongs);
//     if (!track || !track.title || !track.artist || !track.url) {
//       //console.log('Track is missing a required key');
//       return;
//     }
//     //console.log('Resetting playback...');
//     await TrackPlayer.reset();
//     //console.log('Adding track to playback queue:', track);
//     await TrackPlayer.add(track);
//     //console.log('Starting playback...');
//     await TrackPlayer.play();
//   } catch (error) {
//     //console.log('Error playing track:', error);
//   }
// };

// export const playTrack = async (track) => {
//   //console.log('Playing track:', track);
//   try {
//     if (!track || !track.title || !track.artist || !track.url) {
//       //console.log('Track is missing a required key');
//       return;
//     }
//     const currentTrack = await TrackPlayer.getCurrentTrack();
//     if (currentTrack !== null && currentTrack === track.id) {
//       //console.log('Track is already playing. Skipping playback reset.');
//       return;
//     }
//     //console.log('Resetting playback...');
//     await TrackPlayer.reset();
//     //console.log('Adding track to playback queue:', track);
//     await TrackPlayer.add(track);
//     //console.log('Starting playback...');
//     await TrackPlayer.play();
//   } catch (error) {
//     //console.log('Error playing track:', error);
//   }
// };

// export const playTrack = async (track) => {
//   //console.log('Playing track:', track);
//   try {
//     if (!track || !track.title || !track.artist || !track.url) {
//       //console.log('Track is missing a required key');
//       return;
//     }
//     const currentTrack = await TrackPlayer.getCurrentTrack();
//     if (currentTrack !== null && currentTrack === track.id) {
//       const playbackState = await TrackPlayer.getState();
//       if (playbackState === TrackPlayer.STATE_PAUSED) {
//         //console.log('Resuming playback...');
//         await TrackPlayer.play();
//         return;
//       }
//     }
//     const isTrackInQueue = await TrackPlayer.getTrack(track.id);
//     if (isTrackInQueue === null) {
//       //console.log('Adding track to playback queue:', track);
//       await TrackPlayer.add(track);
//     }
//     //console.log('Starting playback...');
//     await TrackPlayer.play();
//   } catch (error) {
//     //console.log('Error playing track:', error);
//   }
// };


// export const playTrack = async (track) => {
//   //console.log('Playing track:', track);
//   try {
//     if (!track || !track.title || !track.artist || !track.url) {
//       //console.log('Track is missing a required key');
//       return;
//     }
//     const currentTrack = await TrackPlayer.getCurrentTrack();
//     if (currentTrack !== null) {
//       const playbackState = await TrackPlayer.getState();
//       if (playbackState === TrackPlayer.STATE_PLAYING) {
        
//         //console.log('Pausing current track...');
//         await TrackPlayer.pause();
//         //console.log('Current track paused');
//       }
//     }
//     await TrackPlayer.reset();
//     //console.log('Adding track to playback queue:', track);
//     await TrackPlayer.add(track);
//     //console.log('Starting playback...');
   
//     await TrackPlayer.play();
//   } catch (error) {
//     //console.log('Error playing track:', error);
//   }
// };

export const playTrack = async (track) => {
  try {
    if (!track || !track.title || !track.artist || !track.url) {
      // Track is missing a required key, handle accordingly
      return;
    }

    const currentTrack = await TrackPlayer.getCurrentTrack();
    const playbackState = await TrackPlayer.getState();

    if (currentTrack !== null && playbackState === TrackPlayer.STATE_PLAYING) {
      // Pause the current track if it is playing
      await TrackPlayer.pause();
    }

    // Stop the current track and reset the player
    await TrackPlayer.stop();
    await TrackPlayer.reset();

    // Add the new track to the playback queue
    await TrackPlayer.add(track);

    // Start playback with the new track
    await TrackPlayer.play();
  } catch (error) {
    // Handle any errors that occur during playback
  }
};





export const pauseTrack = async (trackId) => {
  try {
    //console.log('Pausing track with ID:', trackId);
    //console.log('Current playback state:', await TrackPlayer.getState());
    await TrackPlayer.pause(trackId);
    //console.log('New playback state:', await TrackPlayer.getState());
    //console.log('Track paused successfully');
  } catch (error) {
    ////console.log('Error pausing track:', error);
  }
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
