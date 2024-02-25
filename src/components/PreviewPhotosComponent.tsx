import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {Image, Text, View} from 'react-native';

interface IPreviewPhotosComponent {
  photosHistoricalLength: number;
  photoList: PhotoIdentifier[];
}

export const PreviewPhotosComponent = ({
  photosHistoricalLength,
  photoList,
}: IPreviewPhotosComponent) => {
  console.log({photoList}, photoList[0].node);
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: 'red',
        width: '100%',
        height: 55,
      }}>
      <View style={{flexDirection: 'row', height: '100%'}}>
        {photoList.map((photoInfo: PhotoIdentifier, index) => {
          const {node} = photoInfo
          const {id, image} = node
          const {uri} = image
          const rotateImage = index * 15;
          const zIndexValue = 3 - index;
          return (
            <View
              key={id}
              style={{
                backgroundColor: 'blue',
                width: 30,
                height: '100%',
                transform: [{rotate: `${rotateImage}deg`}],
                position: 'absolute',
                zIndex: zIndexValue,
                left: rotateImage,
              }}>
              <Image source={{uri: uri}} width={30} height={55}/>
            </View>
          );
        })}
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
