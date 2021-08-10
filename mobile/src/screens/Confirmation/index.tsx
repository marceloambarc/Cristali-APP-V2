import React, { useState, useEffect } from 'react';
import { Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

import { pgapi } from '../../services/pgapi';

import { ClientProps } from '../../components/ClientComponent';
import { OrderProps } from '../../components/Order';
import { ItemProps } from '../NewSale';

import { InputMask } from '../../components/InputMask';
import { CristaliButton } from '../../components/CristaliButton'
import { Loading } from '../../components/Loading';
import { Alert } from 'react-native';


export interface PagSeguroConfirmationProps {
  id: string;
  reference: string;
  cardNumber: string;
  declined: string;
  response: string;
  orderId: number;
}

export function Confirmation() {
  const { user, clientToken, sendLog, handleSetNewCondition } = useAuth();
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState('');
  const [pagSeguroId, setPagSeguroId] = useState('');
  const [pagSeguroReference, setPagSeguroReference] = useState('');
  const [pagSeguroCardNumber, setPagSeguroCardNumber] = useState('');
  const [pagSeguroDeclined, setPagSeguroDeclined] = useState('');
  const [pagSeguroResponse, setPagSeguroResponse] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const [orderId, setOrderId] = useState(0);
  const [orderNotes, setOrderNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [qt, setQt] = useState<string | undefined>('');
  const [list, setList] = useState<ItemProps[]>([{id: 0, cd_codigogerado: '', vl_preco: '', nm_produto: ''}]);

  const navigation = useNavigation();
  const route = useRoute();

  const pagSeguroParams = route.params as PagSeguroConfirmationProps;
  const clientParams = route.params as ClientProps;
  const orderParams = route.params as OrderProps;

  useEffect(() => { 
    if(pagSeguroParams) {
      setPagSeguroId(pagSeguroParams.id);
      setOrderId(pagSeguroParams.orderId);
      setPagSeguroReference(pagSeguroParams.reference);
      setPagSeguroCardNumber(pagSeguroParams.cardNumber);
      setPagSeguroDeclined(pagSeguroParams.declined);
      setPagSeguroResponse(pagSeguroParams.response);
      setLoading(false);
    }
  },[pagSeguroParams]);

  useEffect(() => {
    if(clientParams){
      setClientName(clientParams.clientName);
      setClientPhone(clientParams.clientPhone);
      setClientNotes(clientParams.clientNotes);
      setClientEmail(clientParams.clientEmail);
    }

    if(orderParams){
      setOrderId(orderParams.id);
      setOrderNotes(orderParams.orderNotes);
      setTotalPrice(orderParams.totalPrice);
      setQt(orderParams.qt);
      if(orderParams.itens != undefined) {
        setList(orderParams.itens);
      }
    }
    setLoading(false);
  },[orderParams, clientParams]);

  async function handleConfirm() {
    setLoading(true);
    const sendValue = parseInt(value.replace(/\D/g, ""));
    const response = await pgapi.post(`/charges/${pagSeguroId}/capture`,{
      "amount": {
        "value": sendValue
      }
    }).catch(() => {
      Alert.alert('Ops!', 'Valor não confere com a Venda.');
      setLoading(false);
      return;
    });
    if(response) {
      navigation.navigate('SendConfirmation',{
        id: pagSeguroId,
        reference: pagSeguroReference,
        cardNumber: pagSeguroCardNumber,
        value: sendValue
      });
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

  async function handleTryAgain() {
    sendLog({logText:`${user.userName} REINICIOU VENDA RECUSADA POR ${pagSeguroCardNumber}`, clientToken});
    handleSetNewCondition({id: orderId, condition: 212});
    navigation.navigate('NewSale',{
      orderNotes: orderNotes,
      totalPrice: totalPrice,
      condition: 217,
      itens: list,
      client: {
        clientName: clientName,
        clientPhone: clientPhone,
        clientEmail: clientEmail,
        clientNotes: clientNotes,
      }
    });
  }

  async function handleCancel() {
    // navigation.goBack()
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
      sendLog({logText:`${user.userName} CANCELOU VENDA PARA ${clientName}`, clientToken});
      handleSetNewCondition({id: orderId, condition: 213});
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
                <Text style={[styles.textDeclined, {color: theme.colors.Config}]}>{pagSeguroResponse}.</Text>
              </View>

            <View />
            <CristaliButton
              title='Finalizar'
              color={`${theme.colors.Config}`}
              onPress={handleDeclined}
            />
            <CristaliButton
              title='Outra forma de Pagamento'
              color={`${theme.colors.Continue}`}
              onPress={handleTryAgain}
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