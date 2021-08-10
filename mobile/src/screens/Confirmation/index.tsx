import React, { useState, useEffect } from 'react';
import { Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../global';

import { pgapi } from '../../services/pgapi';

import { InputMask } from '../../components/InputMask';
import { CristaliButton } from '../../components/CristaliButton'
import { Loading } from '../../components/Loading';

export interface PagSeguroConfirmationProps {
  id: string;
  reference: string;
  cardNumber: string;
  declined: boolean;
}

export function Confirmation() {
  const [loading, setLoading] = useState(true);

  const [pagSeguroDeclined,setPagSeguroDeclined] = useState(false);
  const [vrfy, setvrfy] = useState('');

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
      setPagSeguroReference(pagSeguroParams.reference);
      setPagSeguroCardNumber(pagSeguroParams.cardNumber);
      setPagSeguroDeclined(pagSeguroParams.declined);

      if(pagSeguroDeclined === false){
        setvrfy('false');
      } else {
        setvrfy('false');
      }
      setLoading(false);
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
    pgapi.post(`/charges/${pagSeguroId}/cancel`,{
      "amount": {
        "value": sendValue
      }
    }).catch(err => {
      if(err instanceof SyntaxError) {
        alert(err.message);
      }
    }).then(res => {
      alert(res)
    })
  }

  if(loading) {
    return (
      <Loading />
    );
  } else {
    return (
      pagSeguroDeclined
      ?
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
        <Text style={styles.text}>Venda Recusada.{"\n"}Contate a Central{"\n"} do seu Cartão.</Text>
        <View />
          <CristaliButton
            title='Finalizar'
            color={`${theme.colors.Success}`}
            onPress={handleConfirm}
          />
        </View>
      </KeyboardAvoidingView>
      :
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text>{vrfy}</Text>
          <Image 
            source={require('../../assets/pagseguro.png')}
            style={styles.pagseguroImage}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.text}>Para Validação da Venda{"\n"} Confirme o Valor.</Text>
        <InputMask
          type={'money'}
          value={value}
          onChangeText={setValue}
          textAlign='center'
        />
        <Text>{vrfy}</Text>
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
      );
  }
}