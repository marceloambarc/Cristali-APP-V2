import React, { useState, useEffect } from 'react';
import { View, Linking, Text, Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import { CristaliButton } from '../../components/CristaliButton';
import { InputMask } from '../../components/InputMask';

import { styles } from './styles';
import { theme } from '../../global';

export function ChangePassword() {
  const { user, enterApp } = useAuth();

  async function handleChangePassword() {
    try {
      await enterApp();
    } catch(err) {
      Alert.alert(err);
    }
  }

  return (
    <View style={styles.container}>
      <CristaliButton 
        title="Botão Teste"
        color={`${theme.colors.Continue}`}
        onPress={handleChangePassword}
      />
      <InputMask
        type={'money'}
        value={'2000000'}
        textAlign='center'
      />
    </View>
  );
}