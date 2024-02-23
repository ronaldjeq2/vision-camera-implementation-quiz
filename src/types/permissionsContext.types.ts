export interface IPermissionsContext {
  hasCameraPermission: boolean;
  requestCameraPermission: () => Promise<void>;
  hasMediaPermission: boolean;
  requestMediaPermission: () => Promise<void>;
}
