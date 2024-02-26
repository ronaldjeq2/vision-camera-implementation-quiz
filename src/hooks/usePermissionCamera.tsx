import {useState} from 'react';
import {useCameraPermission} from 'react-native-vision-camera';
import {getData, storeData} from '../utils/asyncStorage.utils';
import {NUMBER_REQUEST_CAMERA_PERMISSION} from '../constants/storage.constants';
import { showToast } from '../utils/totast.utils';

export const usePermissionCamera = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [hasCameraPermission, setCameraPermissionStatus] =
    useState(hasPermission);

  const requestCameraPermission = async () => {
    if (hasPermission) {
      return;
    }
    const numberOfRequest =
      (await getData(NUMBER_REQUEST_CAMERA_PERMISSION)) ?? '0';
    let numberOfRequestValue = parseInt(numberOfRequest, 10);
    if (numberOfRequestValue >= 2) {
      showToast('Añade los permisos de manera manual')
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

  return {hasCameraPermission, requestCameraPermission};
};
