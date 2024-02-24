import React, {useRef} from 'react';
import {usePermissions} from '../hooks/usePermissions';
import {CameraComponent} from '../components/CameraComponent';
import {Camera} from 'react-native-vision-camera';
import {CameraProvider} from '../contexts/CameraContext';

export const CameraScreen = () => {
  const {hasCameraPermission} = usePermissions();
  const cameraRef = useRef<Camera>(null);

  return (
    <>
      {hasCameraPermission && (
        <CameraProvider cameraRef={cameraRef}>
          <CameraComponent ref={cameraRef} />
        </CameraProvider>
      )}
    </>
  );
};
