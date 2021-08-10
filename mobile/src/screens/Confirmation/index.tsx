import React, { useState, useEffect } from 'react';
import { Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

import { pgapi } from '../../services/pgapi';

import { InputMask } from '../../components/InputMask';
import { CristaliButton } from '../../components/CristaliButton'
import { Loading } from '../../components/Loading';
import { Alert } from 'react-native';

export interface PagSeguroConfirmationProps {
  id: string;
  reference: string;
  cardNumber: string;
  declined: string;
  orderId: number;
}

export function Confirmation() {
  const { user, clientToken, sendLog, handleSetNewCondition } = useAuth();
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState('');
  const [pagSeguroId, setPagSeguroId] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [pagSeguroReference, setPagSeguroReference] = useState('');
  const [pagSeguroCardNumber, setPagSeguroCardNumber] = useState('');
  const [pagSeguroDeclined, setPagSeguroDeclined] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const pagSeguroParams = route.params as PagSeguroConfirmationProps;

  useEffect(() => { 
    if(pagSeguroParams) {
      setPagSeguroId(pagSeguroParams.id);
      setOrderId(pagSeguroParams.orderId);
      setPagSeguroReference(pagSeguroParams.reference);
      setPagSeguroCardNumber(pagSeguroParams.cardNumber);
      setPagSeguroDeclined(pagSeguroParams.declined);

      setLoading(false);
    }

  },[pagSeguroParams]);

  async function handleConfirm() {
    const sendValue = parseInt(value.replace(/\D/g, ""));
    const response = await pgapi.post(`/charges/${pagSeguroId}/capture`,{
      "amount": {
        "value": sendValue
      }
    }).catch(() => {
      Alert.alert('Ops!', 'Valor não confere com a Venda.');
      return;
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

  async function handleDeclined() {
    sendLog({logText:`${user.userName} OBTEVE VENDA RECUSADA POR ${pagSeguroCardNumber}`, clientToken});
    handleSetNewCondition({id: orderId, condition: 212});
    navigation.navigate('Home',{
      userCode: '',
      totalPrice: '',
      orderNotes: '',
      client: {
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientNotes: '',
        userCode: ''
      },
      itens: []
    });
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
      pagSeguroDeclined === "DECLINED"
      ?
      <View style={styles.container}>
        <View style={styles.bodyDeclined}>
            <View>
              <Image 
                source={require('../../assets/pagseguro.png')}
                resizeMode='contain'
              />
              <View style={styles.titleDeclined}>
                <Text style={[styles.textDeclined, {color: theme.colors.Cancel}]}>Venda Recusada.</Text>
                <Text style={[styles.textDeclined, {color: theme.colors.Config}]}>Contate a Central do seu Cartão.</Text>
              </View>

            <View />
            <CristaliButton
              title='Finalizar'
              color={`${theme.colors.Config}`}
              onPress={handleDeclined}
            />
            </View>
        </View>
      </View>
      :
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
        <InputMask
          type={'money'}
          value={value}
          onChangeText={setValue}
          textAlign='center'
        />
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