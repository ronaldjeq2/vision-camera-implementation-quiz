import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {RefObject, useCallback, useEffect, useState} from 'react';
import {useIsEmulator} from 'react-native-device-info';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import useShutterSound from './useShutterSound';
import {cameraConstants} from '../constants/camera.constants';

interface IUseCameraProps {
  cameraRef: RefObject<Camera>;
}

export const useCamera = ({cameraRef}: IUseCameraProps) => {
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const {result: isVirtual} = useIsEmulator();
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const {playSound} = useShutterSound();
  const [fpsCamera, setFpsCamera] = useState<number>(
    cameraConstants.INITIAL_FPS,
  );

  const device = useCameraDevice(cameraType);
  const format = useCameraFormat(device, [{fps: fpsCamera}]);

  const toggleSoundCamera = () => {
    setSoundOn(current => !current);
  };

  const toggleFpsCamera = (numberFps: number) => {
    setFpsCamera(numberFps);
  };

  const toggleFlashCamera = useCallback(() => {
    if (!device?.hasFlash) {
      console.log(
        'El dispositivo no cuenta con flash para estas características',
      );
      return;
    }

    setFlashOn(current => !current);
  }, [device]);

  const toggleCamera = () => {
    setCameraType(currentType => (currentType === 'back' ? 'front' : 'back'));
  };

  const savePhoto = async (file: PhotoFile) => {
    try {
      console.log(file);
      await CameraRoll.saveAsset(`file://${file.path}`, {
        type: 'photo',
      });
    } catch (e) {
      console.log('savePhoto', e);
    } finally {
      console.log('phote saved');
    }
  };

  const takeSimplePhoto = async () => {
    try {
      const photo = await cameraRef?.current?.takePhoto({
        qualityPrioritization:
          isVirtual || cameraType === 'front' ? 'speed' : 'balanced',
        flash: flashOn ? 'on' : 'off',
        enableShutterSound: false,
      });
      if (photo) {
        if (soundOn) {
          playSound();
        }
        savePhoto(photo);
      }
    } catch (e) {
      console.log('takeSimplePhoto', {e});
    }
  };

  return {
    device,
    takeSimplePhoto,
    toggleCamera,
    flashOn,
    toggleFlashCamera,
    toggleSoundCamera,
    soundOn,
    fpsCamera,
    toggleFpsCamera,
    format,
  };
};
