import {useContext} from 'react';
import {PermissionsContextType} from '../types/permissionsContext.types';
import {PermissionsContext} from '../contexts/PermissionsContext';

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
