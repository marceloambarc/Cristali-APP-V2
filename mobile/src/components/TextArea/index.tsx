import React from "react";
import { TextInput, TextInputProps } from "react-native";

import { styles } from './styles';

interface TextAreaProps extends TextInputProps{
  ref?: React.RefObject<any>;
}

export function TextArea({ ref, ...rest } : TextAreaProps){
  return (
    <TextInput 
      style={styles.container}
      ref={ref}
      {...rest}
    />
  );
}