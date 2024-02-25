import {Icon} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {useState} from 'react';
import {SettingsComponentStyles} from '../styles/SettingsComponent.styles';
import {ListItemComponent} from './ListItemComponent';

export const SettingsComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const {AccordionContainer, AccordionIcon} = SettingsComponentStyles;
  return (
    <ListItem.Accordion
      containerStyle={AccordionContainer}
      content={
        <>
          <Icon
            type="material"
            name={'settings'}
            size={20}
            containerStyle={AccordionIcon}
          />
        </>
      }
      noIcon
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}>
      <ListItemComponent />
    </ListItem.Accordion>
  );
};
