import React, {forwardRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {CameraComponentStyles} from '../styles/CameraComponent.styles';
import {SettingsComponent} from './SettingsComponent';
import {useCameraContext} from '../hooks/useCameraContext';
type TCameraRef = Camera;

interface ICameraProps {}

export const CameraComponent = forwardRef<TCameraRef, ICameraProps>(
  (props, ref) => {
    const {device, takeSimplePhoto, fpsCamera} = useCameraContext();
    console.log({fpsCamera});
    if (!device || !fpsCamera) {
      return (
        <View>
          <Text>No está disponible la cámara para el dispositivo</Text>
        </View>
      );
    } else {
      return (
        <View style={CameraComponentStyles.container}>
          <Camera
            ref={ref}
            style={CameraComponentStyles.camera}
            device={device}
            isActive={true}
            format={{
              ...device.formats[0],
              maxFps: fpsCamera,
              minFps: fpsCamera,
            }}
            photo
            fps={fpsCamera}
          />
          <TouchableOpacity
            style={CameraComponentStyles.takePhotoButton}
            onPress={takeSimplePhoto}></TouchableOpacity>
          <View style={CameraComponentStyles.settingsContainer}>
            <SettingsComponent />
          </View>
        </View>
      );
    }
  },
);
