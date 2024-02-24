import {Icon} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {ListItemComponentStyles} from '../styles/ListItemComponent.styles';
import {Text} from 'react-native';
import {useCameraContext} from '../hooks/useCameraContext';

export const ListItemComponent = () => {
  const {ListItemContainer, fpsText} = ListItemComponentStyles;
  const {toggleCamera} = useCameraContext();
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
        onPress={() => console.log('hi', l)}>
        <Icon type="material" name="flash-on" size={20} />
      </ListItem>
      <ListItem
        key={3}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={() => console.log('hi', l)}>
        <Icon type="material" name="volume-up" size={20} />
      </ListItem>
      <ListItem
        key={4}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={() => console.log('hi', l)}>
        <Icon name="place" size={20} />
      </ListItem>
      <ListItem
        key={5}
        bottomDivider
        containerStyle={ListItemContainer}
        onPress={() => console.log('hi', l)}>
        <Text style={fpsText}>60fps</Text>
      </ListItem>
    </>
  );
};
