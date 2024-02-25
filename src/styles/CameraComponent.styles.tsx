import {StyleSheet} from 'react-native';

export const CameraComponentStyles = StyleSheet.create({
  container: {flex: 1, position: 'relative'},
  camera: {flex: 1},
  takePhotoButton: {
    height: 80,
    width: 80,
    backgroundColor: '#ebe8e6',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#d7d2d2',
  },
  settingsContainer: {
    position: 'absolute',
    right: 30,
    top: 10,
    width: 60,
  },
  previewContainerPhotos: {
    position: 'absolute',
    left: 30,
    bottom: 30,
  } 
});
