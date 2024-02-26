import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {Image, Text, View} from 'react-native';
import {PreviewPhotosComponentStyles} from '../styles/PreviewPhotosComponent.styles';

interface IPreviewPhotosComponent {
  photosHistoricalLength: number;
  photoList: PhotoIdentifier[];
}

export const PreviewPhotosComponent = ({
  photosHistoricalLength,
  photoList,
}: IPreviewPhotosComponent) => {
  const {
    photosLength,
    containerLength,
    containerImage,
    photoListContainer,
    principalContainer,
  } = PreviewPhotosComponentStyles;
  return (
    <View style={principalContainer}>
      <View style={photoListContainer}>
        {photoList.map((photoInfo: PhotoIdentifier, index) => {
          const {node} = photoInfo;
          const {id, image} = node;
          const {uri} = image;
          const rotateImage = index * 15;
          const zIndexValue = 3 - index;
          return (
            <View
              key={id}
              style={[
                containerImage,
                {
                  transform: [{rotate: `${rotateImage}deg`}],
                  zIndex: zIndexValue,
                  left: rotateImage,
                },
              ]}>
              <Image source={{uri: uri}} width={30} height={55} />
            </View>
          );
        })}
      </View>
      <View style={containerLength}>
        <Text style={photosLength}>{photosHistoricalLength}</Text>
      </View>
    </View>
  );
};
