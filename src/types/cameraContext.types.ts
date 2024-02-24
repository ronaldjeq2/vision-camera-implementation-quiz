import {CameraDevice} from 'react-native-vision-camera';

export interface ICameraContext {
  device: CameraDevice | undefined;
  takeSimplePhoto: () => Promise<void>;
  toggleCamera: () => void;
}
