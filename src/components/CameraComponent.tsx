import React, {useContext} from 'react';
import {PermissionsContext} from '../contexts/PermissionsContext';
import {Text, View} from 'react-native';
import {usePermissions} from '../hooks/usePermissions';

const CameraComponent = () => {
  const {hasCameraPermission} = usePermissions();
  console.log({hasCameraPermission});
  return (
    <View>
      <Text>holas</Text>
    </View>
  );
};

export default CameraComponent;
