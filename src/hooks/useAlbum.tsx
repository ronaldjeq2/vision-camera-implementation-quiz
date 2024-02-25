import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {useState} from 'react';
import {cameraConstants} from '../constants/camera.constants';

export const useAlbum = () => {
  const [photoList, setPhotoList] = useState<Array<PhotoIdentifier>>([]);
  const [photosHistoricalLength, setPhotosHistoricalLength] =
    useState<number>(0);

  const getHistoricalPhotos = async () => {
    let totalPhotos = 0;
    const photoListItems: Array<PhotoIdentifier> = [];
    let hasNextPage = true;
    let afterCursor;
    while (hasNextPage) {
      try {
        const result = await CameraRoll?.getPhotos({
          first: 200,
          groupTypes: 'SavedPhotos',
          after: afterCursor,
          groupName: cameraConstants.ALBUM_NAME,
        });
        totalPhotos += result.edges.length;
        hasNextPage = result.page_info.has_next_page;
        afterCursor = result.page_info.end_cursor;
        photoListItems.push(...result.edges);
      } catch (e) {
        console.log('takeSimplePhoto', {e});
        hasNextPage = false;
      } finally {
        setPhotosHistoricalLength(totalPhotos);
        setPhotoList(photoListItems.slice(0, 3));
      }
    }
  };

  const getPhotos = async () => {
    try {
      const photo = await CameraRoll?.getPhotos({
        first: 3,
        groupTypes: 'SavedPhotos',
        groupName: cameraConstants.ALBUM_NAME,
      });
      setPhotoList(photo.edges);
    } catch (e) {
      console.log('takeSimplePhoto', {e});
    }
  };

  return {
    getPhotos,
    photoList,
    photosHistoricalLength,
    getHistoricalPhotos,
    setPhotosHistoricalLength,
  };
};
