import React from 'react';
import {BottomSheet, ListItem} from '@rneui/themed';

interface IListItemProps {
  title: string;
  pressItem: () => void;
}

interface IBottomSheetComponentProps {
  listItems: IListItemProps[];
  isVisible: boolean;
}

const BottomSheetComponent: React.FunctionComponent<
  IBottomSheetComponentProps
> = ({listItems, isVisible}) => {
  return (
    <BottomSheet modalProps={{}} isVisible={isVisible}>
      {listItems.map((l, i) => (
        <ListItem key={`${l.title}-${i}`} onPress={l.pressItem}>
          <ListItem.Content>
            <ListItem.Title>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};

export default BottomSheetComponent;
