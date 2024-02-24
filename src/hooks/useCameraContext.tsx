import {useContext} from 'react';
import {ICameraContext} from '../types/cameraContext.types';
import {CameraContext} from '../contexts/CameraContext';

export const useCameraContext = (): ICameraContext => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};
