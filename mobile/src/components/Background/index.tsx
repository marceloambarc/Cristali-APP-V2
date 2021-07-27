import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/index';

interface Props {
  children: ReactNode;
}

export function Background({ children }: Props){
  const { input } = theme.colors
  return (
    <LinearGradient
      style={styles.container}
      colors={[ input, input ]}
    >
      { children }
    </LinearGradient>
  );
}