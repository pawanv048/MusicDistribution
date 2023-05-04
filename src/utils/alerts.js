import { Alert } from 'react-native';

export const showAlert = (title, message) => {
  Alert.alert(title, message);
};

export const showConfirmAlert = (title, message, onConfirm) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: onConfirm,
      },
    ],
    { cancelable: false },
  );
};
