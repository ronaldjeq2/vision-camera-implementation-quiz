import React, {forwardRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {CameraComponentStyles} from '../styles/CameraComponent.styles';
import {SettingsComponent} from './SettingsComponent';
import {useCameraContext} from '../hooks/useCameraContext';
import {PreviewPhotosComponent} from './PreviewPhotosComponent';
type TCameraRef = Camera;

interface ICameraProps {
  hasMediaPermission: boolean
}

export const CameraComponent = forwardRef<TCameraRef, ICameraProps>(
  (props, ref) => {
    const {device, takeSimplePhoto, format, photoList, photosHistoricalLength} =
      useCameraContext();
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
            format={format}
            photo
          />
          <TouchableOpacity
            style={CameraComponentStyles.takePhotoButton}
            onPress={takeSimplePhoto}></TouchableOpacity>
          <View style={CameraComponentStyles.settingsContainer}>
            <SettingsComponent />
          </View>
          {photoList.length > 0 && (
            <View style={CameraComponentStyles.previewContainerPhotos}>
              <PreviewPhotosComponent
                photosHistoricalLength={photosHistoricalLength}
                photoList={photoList}
              />
            </View>
          )}
        </View>
      );
    }
  },
);
