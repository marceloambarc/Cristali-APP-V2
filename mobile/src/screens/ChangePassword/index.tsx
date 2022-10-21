import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import validator from 'validator';
import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import { CristaliInput } from '../../components/CristaliInput';
import { CristaliButton } from '../../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../../global';
import { Logo } from '../../components/Logo';

export function ChangePassword() {
  const { user, clientToken, signOut, enterApp } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isStrong, setIsStrong] = useState(false);

  async function handleChangePassword() {
    try {
      if(newPassword === confirmNewPassword) {
        
        const oldPassword = user.cgc;
        if(oldPassword) {
          if(newPassword === oldPassword) {
            Alert.alert('A Senha não pode ser igual a anterior.');
            return;
          }
          if(!isStrong){  
            Alert.alert('Ops!', 'Senha muito fraca, deve conter letras minúsculas, letras maiúsculas e no mínimo um número.');
          } else {
            await api.put('/changepassword',{
              userCode: (user.userCode)?.toString(),
              oldPassword: (oldPassword).toString(),
              newPassword: newPassword
            },{
              headers: {'Authorization': 'Bearer '+clientToken}
            }).then(() => {
              enterApp();
            }).catch(err => {
              Alert.alert('Ops, tivemos um erro.');
              signOut();
            });
          }
        }
      } else {
        Alert.alert('Senhas não coincidem');
      }
    } catch(err) {
      Alert.alert('Ops!', 'Verifique Sua Conexão.');
      signOut();
    }
  }

  const validate = (value: string) => {
    setNewPassword(value);
    if (validator.isStrongPassword(value,{returnScore: false,
      minLength: 5, minLowercase: 1, minUppercase: 1, minNumbers: 1,
      minSymbols: 0
    })) {
      setErrorMessage('Senha Autorizada');
      setIsStrong(true);
    } else {
      setErrorMessage('Senha muito Fraca');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flexGrow: 10}}
      keyboardVerticalOffset={0}
      contentContainerStyle={{backgroundColor: 'transparent'}}
      behavior={(Platform.OS === 'ios')? "padding" : undefined}
    >
    <View style={styles.container}>
      <Logo subtext versionCode='' />
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
          onChangeText={(e) => validate(e)}
          secureTextEntry={true}
        />
        <Text style={styles.errorPassword}>{errorMessage}</Text>
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

      <View style={styles.footer}>
        <CristaliButton
          title='Entrar'
          color={`${theme.colors.return}`}
          onPress={handleChangePassword}
        />
      </View>

    </View>
    </KeyboardAvoidingView>
  );
}