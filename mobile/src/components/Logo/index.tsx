import React from 'react';
import { View, Image } from 'react-native';

import { styles } from './styles';

interface Props {
  subtext?: boolean;
}

export function Logo({subtext}:Props){
  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require("../../assets/cristali.png")} 
      />
      {
      subtext?
      <View style={styles.subtextContainer}>
        <Image 
          style={styles.subtextImage}
          source={require("../../assets/cristali2.png")}
        />
      </View>
      :
      <View />
      }
    </View>
  );
}