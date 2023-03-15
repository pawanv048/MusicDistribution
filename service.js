import TrackPlayer from 'react-native-track-player';

// module.exports = async function () {
//   // This service needs to be registered for the module to work
//   // but it will be used later in the "Receiving Events" section
//   TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
//   TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
//   TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
// };


module.exports = async function() {
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

  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener('remote-seek', (data) => {
    TrackPlayer.seekTo(data.position);
  });

  TrackPlayer.addEventListener('remote-jump-forward', async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  });

  TrackPlayer.addEventListener('remote-jump-backward', async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  });

  TrackPlayer.addEventListener('playback-track-changed', async (data) => {
    const track = await TrackPlayer.getTrack(data.nextTrack);
    console.log('track', track);
  });

};