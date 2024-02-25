import {useCallback} from 'react';
import Sound from 'react-native-sound';

// Inicialización global recomendada
Sound.setCategory('Playback');

const useShutterSound = () => {
  // Utiliza useCallback para memorizar la función y evitar recreaciones innecesarias
  const playSound = useCallback(() => {
    const shutterSound = new Sound(
      'camera_shutter.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        shutterSound.play(success => {
          if (!success) {
            console.log('Sound did not play');
          }
          // No olvides liberar el sonido una vez que se haya reproducido para evitar fugas de memoria
          shutterSound.release();
        });
      },
    );
  }, []); // Las dependencias vacías aseguran que la función no se recreará en cada render

  return {playSound};
};

export default useShutterSound;
