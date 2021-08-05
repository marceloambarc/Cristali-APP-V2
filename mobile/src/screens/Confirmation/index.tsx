import React, { useState } from 'react';
import { Text, View, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../global';

import { MoneyInput } from '../../components/MoneyInput';
import { CristaliButton } from '../../components/CristaliButton';
import { pgapi } from '../../services/pgapi';
import { useEffect } from 'react';

export interface PagSeguroConfirmationProps {
  id: string;
  refence: string;
  cardNumber: string;
}

export function Confirmation() {
  const [value, setValue] = useState('');
  const [pagSeguroId, setPagSeguroId] = useState('');
  const [pagSeguroReference, setPagSeguroReference] = useState('');
  const [pagSeguroCardNumber, setPagSeguroCardNumber] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const pagSeguroParams = route.params as PagSeguroConfirmationProps;

  useEffect(() => { 
    if(pagSeguroParams) {
      setPagSeguroId(pagSeguroParams.id);
      setPagSeguroReference(pagSeguroParams.refence);
      setPagSeguroCardNumber(pagSeguroParams.cardNumber);
    }

  },[pagSeguroParams]);

  async function handleConfirm() {
    const sendValue = parseInt(value.replace(/\D/g, ""))
    const response = await pgapi.post(`/charges/${pagSeguroId}/capture`,{
      "amount": {
        "value": sendValue
      }
    }).catch(err => {
      console.log(err);
    });
    if(response) {
      navigation.navigate('SendConfirmation',{
        id: pagSeguroId,
        reference: pagSeguroReference,
        cardNumber: pagSeguroCardNumber,
        value: sendValue
      })
    }

  }

  async function handleCancel() {
    navigation.goBack()
    const sendValue = parseInt(value.replace(/\D/g, ""))
    /*pgapi.post(`/charges/${pagSeguroId}/cancel`,{
      "amount": {
        "value": sendValue
      }
    }).catch(err => {
      if(err instanceof SyntaxError) {
        alert(err.message);
      }
    }).then(res => {
      alert(res)
    })*/
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Image 
            source={require('../../assets/pagseguro.png')}
            style={styles.pagseguroImage}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.text}>Para Validação da Venda{"\n"} Confirme o Valor.</Text>
        <MoneyInput
          type={'money'}
          value={value}
          onChangeText={setValue}
          textAlign='center'
        />
        <Text>{pagSeguroId}</Text>
        <View />

          <CristaliButton 
            title='Finalizar'
            color={`${theme.colors.Success}`}
            onPress={handleConfirm}
          />
          <CristaliButton 
            title='Cancelar Venda'
            color={`${theme.colors.Cancel}`}
            onPress={handleCancel}
          />

      </View>
    </KeyboardAvoidingView>
  )
}