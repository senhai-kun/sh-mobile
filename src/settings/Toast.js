import React from 'react'
import { ToastAndroid, Alert } from 'react-native';

export const AutoRotationToast = () => {
    ToastAndroid.showWithGravityAndOffset(
        "Auto Rotation is not supported but it will be updated soon.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        40
    );
}

export const DownloadingToast = () => {
  ToastAndroid.showWithGravityAndOffset(
      "Update is Downloading on Background",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      40
  );
}

export const HDNotAvailableAlert = () => {
  Alert.alert(
      "HD not Available",
      "The link might still not uploaded or got deleted, Slow Server will be used.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
}
export const DownloadingAlert = (progress) => {
  Alert.alert(
      "Downloading Update",
      `Progress: ${progress}`,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
}