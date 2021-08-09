import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useAuth } from '../../hooks/auth';

import { isCreditCardObfuscated } from '../../config/options';
import { token } from '../../../credentials';
import { api } from '../../services/api';
import { pgapi } from '../../services/pgapi';

import { styles } from './styles';
import { theme } from '../../global';

import { OrderProps } from '../../components/Order';
import { ClientProps } from '../../components/ClientComponent';

import { Header } from '../../components/Header';
import { CristaliInput } from '../../components/CristaliInput';
import { Divider } from '../../components/Divider';
import { CristaliButton } from '../../components/CristaliButton';
import { Banner } from '../../components/Banner';
import { Loading } from '../../components/Loading';
import { InputMask } from '../../components/InputMask';

export function PagSeguroScreen() {
  const { user, clientToken, handleSetNewCondition, sendLog } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const orderParams = route.params as OrderProps;
  const clientParams = route.params as ClientProps;

  const [loading, setLoading] = useState(true);
  const [createdPagSeguro, setCreatedPagSeguro] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const [orderNotes, setOrderNotes] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');
  const [qt, setQt] = useState<string | undefined>('');

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirate, setExpirate] = useState('');
  const [expirateMonth, setExpirateMonth] = useState('');
  const [expirateYear, setExpirateYear] = useState('');
  const [cvv, setCvv] = useState('');

  const [isDeclined, setIsDeclined] = useState(false);

  const value = parseInt(totalPrice);
  const codeDoc = String(uuid.v4(orderId.toString()));

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
    }
    setLoading(false);
  },[orderParams, clientParams]);

  useEffect(() => {
    setExpirateMonth(expirate.split('/')[0]);
    setExpirateYear(expirate.split('/')[1]);
  },[expirate]);

  function validate() {
    if(cardName!= '' && cardName != undefined){
      if(cardNumber != '' && cardNumber != undefined){
        if(expirate != '' && expirate != undefined){
          if(cvv != '' && cvv != undefined){
            handleConcludeSale();
            //handleVerify()
          }else{
            Alert.alert('Atenção','Insira do Código de Verificação do Cartão de Crédito');
          }
        }else{
          Alert.alert('Atenção','Insira a Data de Validade do Cartão de Crédito');
        }
      }else{
        Alert.alert('Atenção','Insira o Número do Cartão de Crédito');
      }
    }else{
      Alert.alert('Atenção','Insira o Nome Impresso no Cartão');
    }
  }

  
  function handleConcludeSale() {
    if(createdPagSeguro){
      Alert.alert('Cobrança já enviada');
      return;
    } else {
      setLoading(true);
      handleSendPagSeguro();
    }
  }

  async function handleSendPagSeguro() {
    const cardNumberProto = cardNumber.replace(/\D/g,'');
    const response = await pgapi.post('/charges',
    {
      "reference_id": `${codeDoc}`,
      "description": `${orderNotes}`,
      "amount": {
        "value": `${value}`,
        "currency": "BRL"
      },
      "payment_method": {
        "type": "CREDIT_CARD",
        "installments": 1,
        "capture": false,
        "card": {
          "number": `${cardNumberProto}`,
          "exp_month": `${expirateMonth}`,
          "exp_year": `${expirateYear}`,
          "security_code": `${cvv}`,
          "holder": {
            "name": `${cardName}`
          }
        }
      },
      "notification_urls": [
        "https://192.168.15.200/order/ex-00001/"
      ]
    }
    ).catch(err => {
      console.warn(err);
      Alert.alert('ERRO NO PAGSEGURO', `${err}`)
    });
    if(response) {
      setCreatedPagSeguro(true);
  
      handleSetNewCondition({id: orderId, condition: 220});
    
      const logText = `${user.userName} FINALIZOU VENDA PELO PAGSEGURO`;
      sendLog({logText, clientToken});
      Alert.alert('Enviado PagSeguro');
      setLoading(false);

      if(response.data.status === "DECLINED") {
        setIsDeclined(true);

        navigation.navigate('Confirmation',{
          id: response.data.id,
          reference: response.data.payment_response.reference,
          cardNumber: response.data.payment_method.card.last_digits,
          declined: isDeclined
        });
      }
    }
  }

  if(loading){
    return (
      <Loading />
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={(Platform.OS === 'ios')? 5 : 0}
        contentContainerStyle={{backgroundColor: 'transparent'}}
        behavior={(Platform.OS === 'ios')? "padding" : undefined}
      >
        <StatusBar
          barStyle='dark-content'
          backgroundColor={theme.colors.input}
        />
        <Header
          title='Pagamento'
          haveBack
        />
        <ScrollView>
          <View style={styles.container}>
  
            <View style={styles.titleContainer}>
              <Image 
                source={require('../../assets/pagseguro.png')}
                style={styles.pagseguroImage}
                resizeMode='contain'
              />
            </View>
  
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Email do(a) Cliente</Text>
              <CristaliInput 
                value={clientEmail}
                onChangeText={setClientEmail}
                autoCapitalize='none'
                autoCompleteType='off'
                autoCorrect={false}
                keyboardType='email-address'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Celular do(a) Cliente</Text>
              <CristaliInput 
                value={clientPhone}
                onChangeText={setClientPhone}
                keyboardType='phone-pad'
              />
            </View>
  
            <View style={styles.banner}>
              <Banner />
            </View>
  
           <Divider />
  
            <View style={styles.payment}>
  
              <View style={styles.titleContainer}>
                <Text style={[styles.title, {fontSize: 18}]}>Informações no cartão de Crédito</Text>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Número do Cartão</Text>
                  <InputMask
                    type={'credit-card'}
                    options={{
                      obfuscated: isCreditCardObfuscated
                    }}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType='number-pad'
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Nome Impresso no Cartão</Text>
                  <CristaliInput
                    value={cardName}
                    onChangeText={setCardName}
                  />
                </View>
  
                <View style={styles.code}>
                  <View style={styles.codeRow}>
                    <View style={styles.codeCol}>
                      <Text style={styles.inputText}>Validade</Text>
                      <InputMask
                        type={'datetime'}
                        options={{
                          format: 'MM/YYYY'
                        }}
                        value={expirate}
                        onChangeText={setExpirate}
                        textAlign='center'
                      />
                    </View>
                    <View style={styles.codeCol}>
                      <Text style={styles.inputText}>Cód. de Verificação</Text>
                      <CristaliInput 
                        textAlign='center'
                        keyboardType='number-pad'
                        maxLength={3}
                        value={cvv}
                        onChangeText={setCvv}
                      />
                    </View>
                  </View> 
                </View>
              
              </View>
            </View>
  
            <View style={styles.footer}>
              <CristaliButton 
                title="Continuar"
                color={`${theme.colors.Success}`}
                onPress={validate}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}