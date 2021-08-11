import React from "react";
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import { styles } from './styles';

interface Props extends TextInputMaskProps {
  clientInput?: boolean;
  peachpuff?: boolean;
  productInsert?: boolean;
  productList?: boolean;
}

export function InputMask({ clientInput, peachpuff = false, productInsert = false, productList = false, ...rest } : Props){
  return (
    <TextInputMask 
      style={[
        styles.container, 
        clientInput 
          ? 
          styles.extend 
          : 
          styles.desactivated, 
        peachpuff
          ? 
          styles.color2 
          : 
          styles.color1,
        productInsert
          ?
          styles.inserted
          :
          styles.insert,
        productList
          ?
          styles.productList
          :
          styles.insert,
        ]}
      { ...rest }
    />
  );
}