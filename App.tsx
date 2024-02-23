import React from 'react';
import {PermissionsProvider} from './src/contexts/PermissionsContext';
import CameraComponent from './src/components/CameraComponent';

function App(): React.JSX.Element {
  return (
    <PermissionsProvider>
      <CameraComponent />
    </PermissionsProvider>
  );
}

export default App;
