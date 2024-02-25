import React from 'react';
import {PermissionsProvider} from './src/contexts/PermissionsContext';
import {CameraScreen} from './src/screens/CameraScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PermissionsProvider>
        <CameraScreen />
      </PermissionsProvider>
    </SafeAreaProvider>
  );
}

export default App;
