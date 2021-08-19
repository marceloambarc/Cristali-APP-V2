import React from "react";
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { theme } from "../../global";

import { styles } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color: string;
  switchPressed?: boolean;
}

export function CristaliButton({ title, color, switchPressed=true, ...rest }: Props){
  return (
    <RectButton
      style={[styles.container, 
        switchPressed
          ?
          {backgroundColor: color}
          :
          {backgroundColor: theme.colors.primary}
      ]}
      { ...rest }
    >
      <Text style={styles.title}>
        { title }
      </Text>
    </RectButton>
  );
}