import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import { S_KEY } from "@env";
import Config from 'react-native-config';


import Payment from './PaymentScreen';

const Home = ({navigation}) => {

  //const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Mix02SImlbs6lSYg9selQR2XWgNqqbeYXMHy55cef58CtxvJ8YZJqtKgu44IMZUOBY9giWVHRoz8S1DFSnsG28r00FSLQB05j'
  
  const { confirmPayment, loading } = useConfirmPayment();

  return (
    <View>
      <StripeProvider
        publishableKey='pk_test_51Mix02SImlbs6lSYg9selQR2XWgNqqbeYXMHy55cef58CtxvJ8YZJqtKgu44IMZUOBY9giWVHRoz8S1DFSnsG28r00FSLQB05j'
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <Payment />        
      </StripeProvider>
      <Button title='Dashboard' onPress={() => navigation.goBack()}/>
    </View>
  )
}

export default Home;

// const styles = StyleSheet.create({})





















// // How to Download an Image in React Native from any URL
// // https://aboutreact.com/download-image-in-react-native/

// // Import React
// import React from 'react';

// // Import Required Components
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Image,
//   Platform,
// } from 'react-native';

// // Import RNFetchBlob for the file download
// import RNFetchBlob from 'rn-fetch-blob';
// import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';


// const App = () => {
//   const REMOTE_IMAGE_PATH =
//     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png'
//   const checkPermission = async () => {
    
//     // Function to check the platform
//     // If iOS then start downloading
//     // If Android then ask for permission

   
//     if (Platform.OS === 'ios') {
//       downloadImage();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission Required',
//             message:
//               'App needs access to your storage to download Photos',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           // Once user grant the permission start downloading
//           console.log('Storage Permission Granted.');
//           downloadImage();
//         } else {
//           // If permission denied then show alert
//           alert('Storage Permission Not Granted');
//         }
//       } catch (err) {
//         // To handle permission related exception
//         console.warn(err);
//       }
//     }
//   };

//   const downloadImage = () => {
//     // Main function to download the image
    
//     // To add the time suffix in filename
//     let date = new Date();
//     // Image URL which we want to download
//     let image_URL = REMOTE_IMAGE_PATH;    
//     // Getting the extention of the file
//     let ext = getExtention(image_URL);
//     ext = '.' + ext[0];
//     // Get config and fs from RNFetchBlob
//     // config: To pass the downloading related options
//     // fs: Directory path where we want our image to download
//     const { config, fs } = RNFetchBlob;
//     let PictureDir = fs.dirs.PictureDir;
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         // Related to the Android only
//         useDownloadManager: true,
//         notification: true,
//         path:
//           PictureDir +
//           '/image_' + 
//           Math.floor(date.getTime() + date.getSeconds() / 2) +
//           ext,
//         description: 'Image',
//       },
//     };
//     config(options)
//       .fetch('GET', image_URL)
//       .then(res => {
//         // Showing alert after successful downloading
//         console.log('res -> ', JSON.stringify(res));
//         alert('Image Downloaded Successfully.');
//       });
//   };

//   const requestStoragePermission = async () => {
//     try {
//       const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//       if (result === RESULTS.GRANTED) {
//         console.log('Storage permission granted');
//       } else if (result === RESULTS.DENIED) {
//         const permissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//         if (permissionResult === RESULTS.GRANTED) {
//           console.log('Storage permission granted');
//         } else {
//           console.log('Storage permission denied');
//         }
//       }
//     } catch (error) {
//       console.log('Error checking permission:', error);
//     }
//   };


//   const getExtention = filename => {
//     // To get the file extension
//     return /[.]/.exec(filename) ?
//              /[^.]+$/.exec(filename) : undefined;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ alignItems: 'center' }}>
//         <Text style={{ fontSize: 30, textAlign: 'center' }}>
//           React Native Image Download Example
//         </Text>
//         <Text
//           style={{
//             fontSize: 25,
//             marginTop: 20,
//             marginBottom: 30,
//             textAlign: 'center',
//           }}>
//           www.aboutreact.com
//         </Text>
//       </View>
//       <Image
//         source={{
//           uri: REMOTE_IMAGE_PATH,
//         }}
//         style={{
//           width: '100%',
//           height: 100,
//           resizeMode: 'contain',
//           margin: 5
//         }}
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={checkPermission}>
//         <Text style={styles.text}>
//           Download Image
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={requestStoragePermission}>
//         <Text style={styles.text}>
//           permission
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   button: {
//     width: '80%',
//     padding: 10,
//     backgroundColor: 'orange',
//     margin: 10,
//   },
//   text: {
//     color: '#fff',
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 5,
//   },
// });