import React, {createContext, useEffect} from 'react';
import {usePermissionCamera} from '../hooks/usePermissionCamera';
import {IPermissionsContext} from '../types/permissionsContext.types';
import {usePermissionStorageMedias} from '../hooks/usePermissionStorageMedias';

export const PermissionsContext = createContext<IPermissionsContext | null>(
  null,
);

export const PermissionsProvider = ({children}: any) => {
  const {hasCameraPermission, requestCameraPermission} = usePermissionCamera();
  const {
    hasPermission: hasMediaPermission,
    requestPermissions: requestMediaPermission,
  } = usePermissionStorageMedias();

  const getAllPermissions = async () => {
    await requestCameraPermission();
    await requestMediaPermission();
  };

  useEffect(() => {
    getAllPermissions();
  },[]);

  return (
    <PermissionsContext.Provider
      value={{
        hasCameraPermission,
        requestCameraPermission,
        hasMediaPermission,
        requestMediaPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
