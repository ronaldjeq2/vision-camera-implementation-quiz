import {Icon} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {ListItemComponentStyles} from '../styles/ListItemComponent.styles';
import {Text} from 'react-native';
import {useCameraContext} from '../hooks/useCameraContext';

export const ListItemComponent = () => {
  const {ListItemContainer, fpsText} = ListItemComponentStyles;
  const {
    toggleCamera,
    flashOn,
    toggleFlashCamera,
    device,
    soundOn,
    toggleSoundCamera,
  } = useCameraContext();
  const {hasFlash} = device || {};
  return (
    <>
      <ListItem
        key={1}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={toggleCamera}>
        <Icon type="simple-line-icon" name="refresh" size={20} />
      </ListItem>
      <ListItem
        key={2}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={toggleFlashCamera}>
        <Icon
          type="material"
          name={hasFlash && flashOn ? 'flash-on' : 'flash-off'}
          size={20}
        />
      </ListItem>
      <ListItem
        key={3}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={toggleSoundCamera}>
        <Icon
          type="material"
          name={soundOn ? 'volume-down' : 'volume-mute' }
          size={20}
        />
      </ListItem>
      <ListItem
        key={4}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={() => console.log('hi')}>
        <Text style={fpsText}>60fps</Text>
      </ListItem>
    </>
  );
};
