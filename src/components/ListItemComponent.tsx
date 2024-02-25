import {Icon} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {ListItemComponentStyles} from '../styles/ListItemComponent.styles';
import {Text} from 'react-native';
import {useCameraContext} from '../hooks/useCameraContext';
import BottomSheetComponent from './BottomSheetComponent';
import {cameraConstants} from '../constants/camera.constants';
import {useState} from 'react';

export const ListItemComponent = () => {
  const {ListItemContainer, fpsText} = ListItemComponentStyles;
  const {
    toggleCamera,
    flashOn,
    toggleFlashCamera,
    device,
    soundOn,
    toggleSoundCamera,
    fpsCamera,
    toggleFpsCamera,
  } = useCameraContext();
  const {hasFlash} = device || {};
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const itemPressed = (itemValue: number) => {
    toggleFpsCamera(itemValue)
    setIsSheetVisible(false)
  };

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
          name={soundOn ? 'volume-down' : 'volume-mute'}
          size={20}
        />
      </ListItem>
      <ListItem
        key={4}
        bottomDivider
        containerStyle={[ListItemContainer, {backgroundColor: '#4474fe'}]}
        onPress={() => setIsSheetVisible(true)}>
        <Text style={fpsText}>{fpsCamera}fps</Text>
      </ListItem>
      <BottomSheetComponent
        listItems={[
          {
            title: `${cameraConstants.INITIAL_FPS}fps`,
            pressItem: () => itemPressed(cameraConstants.INITIAL_FPS),
          },
          {
            title: `${cameraConstants.TWO_HUNDRED_AND_TWENTY_FPS}fps`,
            pressItem: () =>
              itemPressed(cameraConstants.TWO_HUNDRED_AND_TWENTY_FPS),
          },
        ]}
        isVisible={isSheetVisible}
      />
    </>
  );
};
