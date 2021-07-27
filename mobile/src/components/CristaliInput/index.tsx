import React from "react";
import { TextInput, TextInputProps } from "react-native";

import { styles } from './styles';

interface Props extends TextInputProps {
  clientInput?: boolean;
  peachpuff?: boolean;
}

export function CristaliInput({ clientInput, peachpuff = false, ...rest } : Props){
  return (
    <TextInput 
      style={[styles.container, clientInput ? styles.extend : styles.desactivated, peachpuff? styles.color2 : styles.color1 ]}
      {...rest}
    />
  );
}