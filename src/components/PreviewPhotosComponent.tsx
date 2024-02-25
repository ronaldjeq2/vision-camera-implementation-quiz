import {Text, View} from 'react-native';

interface IPreviewPhotosComponent {
  photosHistoricalLength: number;
}

export const PreviewPhotosComponent = ({
  photosHistoricalLength,
}: IPreviewPhotosComponent) => {
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: 'red',
        width: '100%',
        height: 55,
      }}>
      <View style={{flexDirection: 'row', height: '100%'}}>
        <View
          style={{
            backgroundColor: 'blue',
            width: 30,
            height: '100%',
            transform: [{rotate: '0deg'}],
            position: 'absolute',
            zIndex: 3,
          }}></View>
        <View
          style={{
            backgroundColor: 'yellow',
            width: 30,
            height: '100%',
            transform: [{rotate: '15deg'}],
            position: 'absolute',
            zIndex: 2,
            left: 15,
          }}></View>
        <View
          style={{
            backgroundColor: 'green',
            width: 30,
            height: '100%',
            transform: [{rotate: '30deg'}],
            position: 'absolute',
            zIndex: 1,
            left: 30,
          }}></View>
      </View>
      <View
        style={{
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
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {photosHistoricalLength}
        </Text>
      </View>
    </View>
  );
};
