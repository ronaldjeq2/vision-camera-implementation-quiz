import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {RefObject} from 'react';
import {Camera, PhotoFile, useCameraDevice} from 'react-native-vision-camera';

interface IUseCameraProps {
  cameraRef: RefObject<Camera>;
}

export const useCamera = ({cameraRef}: IUseCameraProps) => {
  const device = useCameraDevice('back');

  const savePhoto = async (file: PhotoFile) => {
    await CameraRoll.saveAsset(`file://${file.path}`, {
      type: 'photo',
    })

  }

  const takeSimplePhoto = async () => {
    const photo = await cameraRef?.current?.takePhoto();
    if (photo) {
      savePhoto(photo)
    }
  };

  return {device, takeSimplePhoto};
};
