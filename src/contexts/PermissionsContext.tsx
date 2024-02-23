import React, {createContext} from 'react';
import {usePermissionCamera} from '../hooks/usePermissionCamera';
import {PermissionsContextType} from '../types/permissionsContext.types';

export const PermissionsContext = createContext<PermissionsContextType | null>(
  null,
);

export const PermissionsProvider = ({children}: any) => {
  const {hasCameraPermission, requestCameraPermission} = usePermissionCamera();

  return (
    <PermissionsContext.Provider
      value={{hasCameraPermission, requestCameraPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
