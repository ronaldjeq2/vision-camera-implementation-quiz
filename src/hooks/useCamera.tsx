import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {RefObject, useState} from 'react';
import {Camera, PhotoFile, useCameraDevice} from 'react-native-vision-camera';

interface IUseCameraProps {
  cameraRef: RefObject<Camera>;
}

export const useCamera = ({cameraRef}: IUseCameraProps) => {
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const device = useCameraDevice(cameraType);

  /*   const device: CameraDevice | undefined =
    cameraPosition === 'back' ? devices.back : devices.front; */

  // Función para cambiar entre cámara frontal y trasera.
  const toggleCamera = () => {
    setCameraType(currentType => (currentType === 'back' ? 'front' : 'back'));
  };

  const savePhoto = async (file: PhotoFile) => {
    try {
      console.log('savePhoto');

      await CameraRoll.saveAsset(`file://${file.path}`, {
        type: 'photo',
      });
    } catch (e) {
      console.log('savePhoto', {e});
    }
  };

  const takeSimplePhoto = async () => {
    try {
      console.log('takeSimplePhoto');
      const photo = await cameraRef?.current?.takePhoto({
        qualityPrioritization: cameraType === 'front' ? 'speed' : 'balanced',
      });
      if (photo) {
        savePhoto(photo);
      }
    } catch (e) {
      console.log('takeSimplePhoto', {e});
    }
  };

  return {device, takeSimplePhoto, toggleCamera};
};
