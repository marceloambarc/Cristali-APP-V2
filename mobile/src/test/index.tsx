import React from 'react';
import { View, Linking, Platform } from 'react-native';

import { CristaliButton } from '../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../global';

async function handleSettings(){
  Linking.openSettings();
}

export function Test(){
  return (
    <View style={styles.container}>
      <CristaliButton 
        title="Botão Teste"
        color={`${theme.colors.Continue}`}
        onPress={handleSettings}
      />
    </View>
  );
}