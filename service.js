import TrackPlayer, { State } from 'react-native-track-player';

module.exports = async function () {
  await TrackPlayer.setupPlayer();


  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener('playback-state', (state) => {
    console.log('playback state changed', state);
  });

  TrackPlayer.addEventListener('playback-track-changed', (track) => {
    console.log('Playback track changed:', track);
  });
  // Set up the event listener for the playback queue ended event
  TrackPlayer.addEventListener('playback-queue-ended', () => {
    // The playback queue has ended, so call the reset method here
    TrackPlayer.reset();
  });
};
