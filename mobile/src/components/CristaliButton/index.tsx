import React from "react";
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color: string;
}

export function CristaliButton({ title, color, ...rest }: Props){
  return (
    <RectButton
      style={[styles.container, {backgroundColor: color}]}
      { ...rest }
    >
      <Text style={styles.title}>
        { title }
      </Text>
    </RectButton>
  );
}