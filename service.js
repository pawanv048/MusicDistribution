// import TrackPlayer,{Event} from 'react-native-track-player';


// module.exports = async function() {
//   await TrackPlayer.setupPlayer();

//   //TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  
//   TrackPlayer.addEventListener('remote-play', () => {
//     TrackPlayer.play();
//   });

//   TrackPlayer.addEventListener('remote-pause', () => {
//     TrackPlayer.pause();
//   });

//   TrackPlayer.addEventListener('remote-stop', () => {
//     TrackPlayer.stop();
//   });

//   TrackPlayer.addEventListener('remote-next', () => {
//     TrackPlayer.skipToNext();
//   });

//   TrackPlayer.addEventListener('playback-state', (state) => {
//     console.log('playback state changed', state);
//   });
//   TrackPlayer.addEventListener('playback-track-changed', (track) => {
//     console.log('playback track changed', track);
//   });

// };



import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function() {
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
    switch (state.state) {
      case TrackPlayer.STATE_NONE:
        console.log('No playback');
        break;
      case TrackPlayer.STATE_PLAYING:
        console.log('Playback is playing');
        break;
      case TrackPlayer.STATE_PAUSED:
        console.log('Playback is paused');
        break;
      case TrackPlayer.STATE_STOPPED:
        console.log('Playback is stopped');
        break;
      case TrackPlayer.STATE_BUFFERING:
        console.log('Playback is buffering');
        break;
      default:
        console.log('Unknown playback state');
        break;
    }
  });

  TrackPlayer.addEventListener('playback-track-changed', (track) => {
    console.log('Playback track changed:', track);
  });
};
