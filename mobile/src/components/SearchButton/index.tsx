import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

interface Props extends RectButtonProps {
  color: string;
}

export function SearchButton({ color, ...rest } : Props){
  return (
    <RectButton 
      style={[styles.container, {backgroundColor: color}]}
      { ...rest }
    >
      <FontAwesome name="search" size={24} color="white" />
      
    </RectButton>
  );
}