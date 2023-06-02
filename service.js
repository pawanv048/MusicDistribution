
import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener('playback-state', (state) => {
    console.log('playback state changed', state);
  });

  TrackPlayer.addEventListener('playback-track-changed', (track) => {
    console.log('Playback track changed:', track);
  })

  TrackPlayer.addEventListener('remote-seek', (event) => {
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener('remote-jump-backward', () => {
    TrackPlayer.getPosition().then((position) => {
      TrackPlayer.seekTo(position - 10);
    });
  });

  TrackPlayer.addEventListener('remote-jump-forward', () => {
    TrackPlayer.getPosition().then((position) => {
      TrackPlayer.seekTo(position + 10);
    });
  });

  await TrackPlayer.setupPlayer();

  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
    ],
  });
};
