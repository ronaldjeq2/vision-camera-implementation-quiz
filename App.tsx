import React from 'react';
import {PermissionsProvider} from './src/contexts/PermissionsContext';
import {CameraScreen} from './src/screens/CameraScreen';

function App(): React.JSX.Element {
  return (
    <PermissionsProvider>
      <CameraScreen />
    </PermissionsProvider>
  );
}

export default App;
