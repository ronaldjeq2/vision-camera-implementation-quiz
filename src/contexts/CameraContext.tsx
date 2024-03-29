import React, {createContext} from 'react';
import {useCamera} from '../hooks/useCamera';
import {ICameraContext} from '../types/cameraContext.types';

export const CameraContext = createContext<ICameraContext | null>(null);

export const CameraProvider = ({
  children,
  cameraRef,
  hasMediaPermission,
}: any) => {
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
    photoList,
    photosHistoricalLength,
    getHistoricalPhotos,
    enableHdr,
    toggleHdrCamera
  } = useCamera({
    cameraRef,
    hasMediaPermission,
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
        photoList,
        photosHistoricalLength,
        getHistoricalPhotos,
        enableHdr,
        toggleHdrCamera
      }}>
      {children}
    </CameraContext.Provider>
  );
};
