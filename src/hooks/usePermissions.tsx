import {useContext} from 'react';
import {IPermissionsContext} from '../types/permissionsContext.types';
import {PermissionsContext} from '../contexts/PermissionsContext';

export const usePermissions = (): IPermissionsContext => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
