import {useState} from 'react';
import {Permission} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';

interface IUsePermissionStorageMediasProps {
  isVirtual: boolean;
}

export const usePermissionStorageMedias = ({
  isVirtual,
}: IUsePermissionStorageMediasProps) => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermissions = async () => {
    const permissionsToCheck: Permission[] = [];
    if (isVirtual) {
      permissionsToCheck.push(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }
    if (parseInt(`${Platform.Version}`, 10) >= 33) {
      permissionsToCheck.push(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      );
    } else {
      permissionsToCheck.push(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
    return Promise.all(
      permissionsToCheck.map(permissionItem =>
        PermissionsAndroid.check(permissionItem),
      ),
    ).then(results => results.every(result => result));
  };

  const requestPermissions = async () => {
    let isGranted = await checkPermissions();

    if (!isGranted) {
      const permissionsToRequest: Permission[] = [];
      if (isVirtual) {
        permissionsToRequest.push(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }
      if (parseInt(`${Platform.Version}`, 10) >= 33) {
        permissionsToRequest.push(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        );
      } else {
        permissionsToRequest.push(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
      isGranted = await PermissionsAndroid.requestMultiple(
        permissionsToRequest,
      ).then(statuses =>
        permissionsToRequest.every(
          permission =>
            statuses[permission] === PermissionsAndroid.RESULTS.GRANTED,
        ),
      );
    }

    setHasPermission(isGranted);
  };

  return {hasPermission, requestPermissions};
};
