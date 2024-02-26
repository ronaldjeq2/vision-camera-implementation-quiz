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
import {useAlbum} from './useAlbum';
import {showToast} from '../utils/totast.utils';

interface IUseCameraProps {
  cameraRef: RefObject<Camera>;
  hasMediaPermission: boolean;
}

export const useCamera = ({cameraRef, hasMediaPermission}: IUseCameraProps) => {
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const {result: isVirtual} = useIsEmulator();
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const {playSound} = useShutterSound();
  const [fpsCamera, setFpsCamera] = useState<number>(
    cameraConstants.INITIAL_FPS,
  );
  const [enableHdr, setEnableHdr] = useState(false);
  const {
    getPhotos,
    photoList,
    photosHistoricalLength,
    getHistoricalPhotos,
    setPhotosHistoricalLength,
  } = useAlbum();

  const device = useCameraDevice(cameraType);
  const format = useCameraFormat(device, [{fps: fpsCamera}]);
  const supportsHdr = format?.supportsPhotoHdr;

  useEffect(() => {
    if (hasMediaPermission) {
      getHistoricalPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMediaPermission]);

  const toggleHdrCamera = () => {
    if (!supportsHdr) {
      showToast('El dispositivo no cuenta con Hdr para estas características');
      return;
    }
    setEnableHdr(current => !current);
  };

  const toggleSoundCamera = () => {
    setSoundOn(current => !current);
  };

  const toggleFpsCamera = (numberFps: number) => {
    setFpsCamera(numberFps);
  };

  const toggleFlashCamera = useCallback(() => {
    if (!device?.hasFlash) {
      showToast(
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
      const filePath = file.path;
      await CameraRoll.saveAsset(`file://${filePath}`, {
        type: 'photo',
        album: cameraConstants.ALBUM_NAME,
      });
      setPhotosHistoricalLength(current => ++current);
    } catch (e) {
    } finally {
      getPhotos();
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
    } catch (e) {}
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
    photoList,
    photosHistoricalLength,
    getHistoricalPhotos,
    enableHdr,
    toggleHdrCamera,
  };
};
