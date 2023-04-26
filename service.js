import TrackPlayer,{Event} from 'react-native-track-player';


module.exports = async function() {
  await TrackPlayer.setupPlayer();

  //TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  
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
    console.log('playback track changed', track);
  });

};