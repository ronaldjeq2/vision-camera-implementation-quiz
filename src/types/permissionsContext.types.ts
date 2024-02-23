export interface PermissionsContextType {
  hasCameraPermission: boolean;
  requestCameraPermission: () => Promise<void>;
}
