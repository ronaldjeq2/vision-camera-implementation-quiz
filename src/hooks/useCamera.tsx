import {RefObject} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

interface IUseCameraProps {
  cameraRef: RefObject<Camera>;
}

export const useCamera = ({cameraRef}: IUseCameraProps) => {
  const device = useCameraDevice('back');

  const takeSimplePhoto = async () => {
    const photo = await cameraRef?.current?.takePhoto();
  };

  return {device, takeSimplePhoto};
};
