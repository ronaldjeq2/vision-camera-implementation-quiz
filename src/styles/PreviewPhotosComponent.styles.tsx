import {StyleSheet} from 'react-native';

export const PreviewPhotosComponentStyles = StyleSheet.create({
  principalContainer: {
    position: 'relative',
    backgroundColor: 'red',
    width: '100%',
    height: 55,
  },
  photoListContainer: {flexDirection: 'row', height: '100%'},
  containerImage: {
    width: 30,
    height: '100%',
    position: 'absolute',
  },
  containerLength: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: 'white',
    zIndex: 4,
    bottom: -10,
    borderRadius: 25,
    left: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photosLength: {color: 'black', fontWeight: 'bold'},
});
