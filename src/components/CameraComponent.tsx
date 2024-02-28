import React, {forwardRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {Camera} from 'react-native-vision-camera';
import {CameraComponentStyles} from '../styles/CameraComponent.styles';
import {SettingsComponent} from './SettingsComponent';
import {useCameraContext} from '../hooks/useCameraContext';
import {PreviewPhotosComponent} from './PreviewPhotosComponent';

type TCameraRef = Camera;

interface ICameraProps {
  hasMediaPermission: boolean;
}

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

export const CameraComponent = forwardRef<TCameraRef, ICameraProps>(
  (props, ref) => {
    const {
      device,
      takeSimplePhoto,
      format,
      photoList,
      photosHistoricalLength,
      enableHdr,
    } = useCameraContext();

    const zoom = useSharedValue(device?.neutralZoom);
    const zoomOffset = useSharedValue(0);

    const handleZoom = (scale: number) => {
      const z = zoomOffset.value * scale;
      zoom.value = interpolate(
        z,
        [0.5, 10],
        [device?.minZoom ?? 0.5, device?.maxZoom ?? 10],
        Extrapolation.CLAMP,
      );
    };

    const gesture = Gesture.Pinch()
      .onBegin(() => {
        zoomOffset.value = zoom?.value ?? 0;
      })
      .onUpdate(event => {
        handleZoom(event.scale);
      });

    if (!device) {
      return (
        <View>
          <Text>No está disponible la cámara para el dispositivo</Text>
        </View>
      );
    } else {
      return (
        <View style={CameraComponentStyles.container}>
          <GestureDetector gesture={gesture}>
            <ReanimatedCamera
              ref={ref}
              style={CameraComponentStyles.camera}
              device={device}
              isActive={true}
              format={format}
              photo={true}
              photoHdr={format?.supportsPhotoHdr && enableHdr}
              //enableZoomGesture
            />

            <TouchableOpacity
              style={CameraComponentStyles.takePhotoButton}
              onPress={takeSimplePhoto}></TouchableOpacity>
            <View style={CameraComponentStyles.settingsContainer}>
              <SettingsComponent />
            </View>
            <View
              style={{
                width: 120,
                position: 'absolute',
                height: 30,
                bottom: 150,
                left: 140,
                flexDirection: 'row',
                gap: 20,
              }}>
              {[0.5, 1, 2].map(zoomItem => {
                return (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 30,
                    }}
                    onPress={() => handleZoom(zoomItem)}
                    key={zoomItem}>
                    <Text style={{color: 'black'}}>x{zoomItem}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {photoList.length > 0 && (
              <View style={CameraComponentStyles.previewContainerPhotos}>
                <PreviewPhotosComponent
                  photosHistoricalLength={photosHistoricalLength}
                  photoList={photoList}
                />
              </View>
            )}
          </GestureDetector>
        </View>
      );
    }
  },
);
