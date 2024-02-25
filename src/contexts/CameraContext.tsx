import React, {createContext} from 'react';
import {useCamera} from '../hooks/useCamera';
import {ICameraContext} from '../types/cameraContext.types';

export const CameraContext = createContext<ICameraContext | null>(null);

export const CameraProvider = ({children, cameraRef}: any) => {
  const {
    takeSimplePhoto,
    toggleCamera,
    device,
    toggleFlashCamera,
    flashOn,
    soundOn,
    toggleSoundCamera,
    fpsCamera,
    toggleFpsCamera,
    format,
  } = useCamera({
    cameraRef,
  });

  return (
    <CameraContext.Provider
      value={{
        takeSimplePhoto,
        toggleCamera,
        device,
        toggleFlashCamera,
        flashOn,
        soundOn,
        toggleSoundCamera,
        fpsCamera,
        toggleFpsCamera,
        format,
      }}>
      {children}
    </CameraContext.Provider>
  );
};
