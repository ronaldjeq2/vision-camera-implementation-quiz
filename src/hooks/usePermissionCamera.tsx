import {useState, useEffect} from 'react';
import {useCameraPermission} from 'react-native-vision-camera';
import {getData, storeData} from '../utils/asyncStorage.utils';
import {NUMBER_REQUEST_CAMERA_PERMISSION} from '../constants/storage.constants';

export const usePermissionCamera = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [hasCameraPermission, setCameraPermissionStatus] =
    useState(hasPermission);

  const requestCameraPermission = async () => {
    const numberOfRequest =
      (await getData(NUMBER_REQUEST_CAMERA_PERMISSION)) ?? '0';
    let numberOfRequestValue = parseInt(numberOfRequest, 10);
    if (numberOfRequestValue >= 2) {
      console.log('no hay más permisos');
    } else if (numberOfRequestValue < 2) {
      const permissionStatus = await requestPermission();
      if (!permissionStatus) {
        storeData(
          NUMBER_REQUEST_CAMERA_PERMISSION,
          `${numberOfRequestValue + 1}`,
        );
      }
      setCameraPermissionStatus(permissionStatus);
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      requestCameraPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {hasCameraPermission, requestCameraPermission};
};
