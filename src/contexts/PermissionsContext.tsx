import React, {createContext, useEffect} from 'react';
import {usePermissionCamera} from '../hooks/usePermissionCamera';
import {IPermissionsContext} from '../types/permissionsContext.types';
import {usePermissionStorageMedias} from '../hooks/usePermissionStorageMedias';
import {useIsEmulator} from 'react-native-device-info';

export const PermissionsContext = createContext<IPermissionsContext | null>(
  null,
);

export const PermissionsProvider = ({children}: any) => {
  const {result: isVirtual, loading} = useIsEmulator();
  const {hasCameraPermission, requestCameraPermission} = usePermissionCamera();

  const {
    hasPermission: hasMediaPermission,
    requestPermissions: requestMediaPermission,
  } = usePermissionStorageMedias({isVirtual});

  const getAllPermissions = async () => {
    await requestCameraPermission();
    await requestMediaPermission();
  };

  useEffect(() => {
    if (!loading) {
      getAllPermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isVirtual]);

  return (
    <PermissionsContext.Provider
      value={{
        hasCameraPermission,
        requestCameraPermission,
        hasMediaPermission,
        requestMediaPermission,
        getAllPermissions,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
