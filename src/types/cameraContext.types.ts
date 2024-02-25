import {CameraDevice, CameraDeviceFormat} from 'react-native-vision-camera';

export interface ICameraContext {
  device: CameraDevice | undefined;
  takeSimplePhoto: () => Promise<void>;
  toggleCamera: () => void;
  toggleFlashCamera: () => void;
  flashOn: boolean;
  soundOn: boolean;
  toggleSoundCamera: () => void;
  fpsCamera: number
  toggleFpsCamera: (item: number) => void;
  format: CameraDeviceFormat | undefined;
}
