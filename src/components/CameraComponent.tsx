import React, {LegacyRef, forwardRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
} from 'react-native-vision-camera';
import {CameraComponentStyles} from '../styles/CameraComponent.styles';
import {Icon} from '@rneui/themed';
import {SettingsComponent} from './SettingsComponent';
import { useCameraContext } from '../hooks/useCameraContext';
type TCameraRef = Camera;

interface ICameraProps {
}

export const CameraComponent = forwardRef<TCameraRef, ICameraProps>(
  (props, ref) => {
    const {device, takeSimplePhoto} = useCameraContext();
    if (!device) {
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
            photo
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
