import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import { CristaliInput } from '../../components/CristaliInput';
import { CristaliButton } from '../../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../../global';
import { Logo } from '../../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_PASSWORD } from '../../config/storage';

export function ChangePassword() {
  const { user, clientToken, oldPassword, enterApp } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function handleChangePassword() {
    try {
      if(newPassword === confirmNewPassword) {
        
        const storage = await AsyncStorage.getItem(COLLECTION_PASSWORD);
        if(storage) {
          const oldPassword = JSON.parse(storage);
          console.log(oldPassword);
          await api.put('/changepassword',{
            userCode: (user.userCode)?.toString(),
            oldPassword: (oldPassword).toString(),
            newPassword: newPassword
          },{
            headers: {'Authorization': 'Bearer '+clientToken}
          }).then(() => {
            enterApp();
          }).catch(err => {
            console.log(err);
          });
        }

      } else if (newPassword === oldPassword){
        Alert.alert('A Senha não pode ser igual a anterior.');
      } else {
        Alert.alert('Senhas não coincidem');
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flexGrow: 10}}
      keyboardVerticalOffset={0}
      contentContainerStyle={{backgroundColor: 'transparent'}}
      behavior={'padding' }
    >
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>
        SEJA BEM VINDA!
      </Text>
      <Text style={styles.text}>Para iniciar a Aplicação altere sua senha, qualquer dúvida entre em contato com sua supervisora.</Text>

        <View style={styles.falseDivider}/>
        <Text style={styles.cristaliInputText}>NOVA SENHA</Text>
          <CristaliInput 
            textAlign='center'
            peachpuff
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
          <View style={styles.falseDivider2}/>
          <Text style={styles.cristaliInputText}>CONFIRME NOVA SENHA</Text>
          <CristaliInput 
            textAlign='center'
            peachpuff
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry={true}
          />
        <View style={styles.falseDivider}/>

      <CristaliButton 
        title='Entrar'
        color={`${theme.colors.return}`}
        onPress={handleChangePassword}
      />
    </View>
    </KeyboardAvoidingView>
  );
}