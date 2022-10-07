import React from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from './styles';

interface Props {
  subtext?: boolean;
  versionCode?: string;
}

export function Logo({subtext, versionCode}:Props){
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
        <Text style={styles.versionText}>{versionCode}</Text>
      </View>
      :
      <View />
      }
    </View>
  );
}