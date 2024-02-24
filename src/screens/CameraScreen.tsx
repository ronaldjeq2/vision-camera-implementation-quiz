import React, {useRef} from 'react';
import {usePermissions} from '../hooks/usePermissions';
import {CameraComponent} from '../components/CameraComponent';
import {Camera} from 'react-native-vision-camera';
import {useCamera} from '../hooks/useCamera';

export const CameraScreen = () => {
  const {hasCameraPermission, hasMediaPermission} = usePermissions();
  const cameraRef = useRef<Camera>(null);
  const {device, takeSimplePhoto} = useCamera({cameraRef});
  console.log({hasMediaPermission})
  return (
    <>
      {hasCameraPermission && (
        <CameraComponent
          ref={cameraRef}
          device={device}
          takeSimplePhoto={takeSimplePhoto}
        />
      )}
    </>
  );
};
