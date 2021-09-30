import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useAuth } from '../../hooks/auth';

import { isCreditCardObfuscated } from '../../config/options';
import { pgapi } from '../../services/pgapi';

import { styles } from './styles';
import { theme } from '../../global';

import { OrderProps } from '../../components/Order';
import { ClientProps } from '../../components/ClientComponent';
import { ItemProps } from '../NewSale';

import { Header } from '../../components/Header';
import { CristaliInput } from '../../components/CristaliInput';
import { Divider } from '../../components/Divider';
import { CristaliButton } from '../../components/CristaliButton';
import { Banner } from '../../components/Banner';
import { Loading } from '../../components/Loading';
import { InputMask } from '../../components/InputMask';
import { InstallmentModal } from '../../components/InstallmentModal';

export function PagSeguroScreen() {
  const { user, clientToken, handleSetNewCondition, sendLog } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const orderParams = route.params as OrderProps;
  const clientParams = route.params as ClientProps;

  const [loading, setLoading] = useState(true);
  const [createdPagSeguro, setCreatedPagSeguro] = useState(false);
  const [openInstallmentsModal, SetOpenInstallmentsModal] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientCgc, setClientCgc] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const [orderNotes, setOrderNotes] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');
  const [qt, setQt] = useState<string | undefined>('');

  const [list, setList] = useState<ItemProps[]>([{id: 0, cd_codigogerado: '', vl_preco: '', nm_produto: ''}]);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirate, setExpirate] = useState('');
  const [expirateMonth, setExpirateMonth] = useState('');
  const [expirateYear, setExpirateYear] = useState('');
  const [cvv, setCvv] = useState('');

  const [totalInstallments, setTotalInstallments] = useState(0);
  const [installment, setInstallment] = useState(1);

  const value = parseInt(totalPrice);
  const codeDoc = String(uuid.v4(orderId.toString()));

  useEffect(() => {
    if(clientParams){
      setClientName(clientParams.clientName);
      setClientCgc(clientParams.clientCgc);
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
      handleInstallments();
    }
  }

  function handleInstallmentFinish() {
    SetOpenInstallmentsModal(false);
    setLoading(true);
    handleSendPagSeguro();
  }

  function handleInstallmentSelect(installmentSelect: number) {
    setInstallment(installmentSelect);
  }

  function handleSetInstallments() {
    const rounded = Math.round(parseInt(totalPrice) /100);
    const installmentProto = Math.floor(rounded / 25);
    setTotalInstallments(installmentProto);
  }

  function handleInstallments() {
    handleSetInstallments();
    SetOpenInstallmentsModal(true);
  }

  function closeInstallments() {
    SetOpenInstallmentsModal(false);
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
          "installments": `${installment}`,
          "capture": true,
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
          "https://177.10.0.126:53000/order/ex-00001/"
        ]
      }
    ).catch(err => {
      
      const errorString = String(err);
      const res = errorString.replace(/\D/g,'');

      if(res === '403'){

        sendLog({logText:`CONTA CRISTALI PROIBIDA DE USAR APLICAÇÃO PAGSEGURO`, clientToken});
        handleSetNewCondition({id: orderId, condition: 221});
        setLoading(false);
        handleNavigateRejected('0', '0', cardNumber, 'true', 'Conta não liberada para uso do PagSeguro', value.toString())

      }else if(res === '401'){
        
        sendLog({logText:` PAGSEGURO BLOQUEOU ${user.userName} DE REALIZAR OPERAÇÃO`, clientToken});
        handleSetNewCondition({id: orderId, condition: 221});
        setLoading(false);
        handleNavigateRejected('0', '0', cardNumber, 'true', 'PagSeguro bloqueou sua Operação', value.toString())

      } else if(res === '409'){

        sendLog({logText:` PAGSEGURO BLOQUEOU ${user.userName} POR DUPLICIDADE`, clientToken});
        handleSetNewCondition({id: orderId, condition: 221});
        setLoading(false);
        handleNavigateRejected('0', '0', cardNumber, 'true', 'Venda já Realizada', value.toString())

      } else {
        handleSetNewCondition({id: orderId, condition: 221});
        const message = err.response.data.error_messages[0].description;
        
        if(message === 'invalid_parameter') {
          Alert.alert('Ops!', 'Dados do Cartão são inválidos. Tente novamente.');
          handleNavigateHome();
          return;
        } else {
          Alert.alert('Ops!', err);
          handleSetNewCondition({id: orderId, condition: 221});
          handleNavigateHome();
        }
      }

    });

    if(response) {
      console.log(response.data);
      setCreatedPagSeguro(true);
      if(response.data.status === 'PAID'){
        sendLog({logText:`${user.userName} OBTEVE VENDA Nº ${response.data.payment_response.reference} PAGA`, clientToken});
        handleSetNewCondition({id: orderId, condition: 220});
        navigation.navigate('SendConfirmation',{
          pagSeguroId: response.data.id,
          reference: response.data.payment_response.reference,
          cardNumber: response.data.payment_method.card.last_digits,
          declined: response.data.status,
          message: response.data.payment_response.message,
          value: response.data.amount.value.toString(),
          id: orderId,
          clientName: clientName,
          clientCgc: clientCgc,
          clientPhone: clientPhone,
          clientEmail: clientEmail,
          clientNotes: clientNotes,
        });
      } else {
        sendLog({logText:`${user.userName} OBTEVE VENDA Nº ${response.data.payment_response.reference} REJEITADA`, clientToken});
        handleSetNewCondition({id: orderId, condition: 221});
        handleNavigateRejected(response.data.id, 
          response.data.payment_response.reference, 
          response.data.payment_method.card.last_digits,
          response.data.status,
          response.data.payment_response.message,
          response.data.amount.value.toString());
      }
    }
  }

  function handleNavigateHome(){
    navigation.navigate('Home',{
      userCode: '',
      totalPrice: '',
      orderNotes: '',
      client: {
        clientName: '',
        clientCgc: '',
        clientPhone: '',
        clientEmail: '',
        clientNotes: '',
        userCode: ''
      },
      itens: []
    });
  }

  function handleNavigateRejected(pagSeguroId: string, reference: string, cardNumber: string, declined: string, response: string, value: string){
    navigation.navigate('Rejected',{
      pagSeguroId: pagSeguroId,
      reference: reference,
      cardNumber: cardNumber,
      declined: declined,
      response: response,
      value: value,
      id: orderId,
      clientName: clientName,
      clientCgc: clientCgc,
      clientPhone: clientPhone,
      clientEmail: clientEmail,
      clientNotes: clientNotes,
    });
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
              <InputMask
                type={'cel-phone'}
                value={clientPhone}
                onChangeText={setClientPhone}
                textAlign='left'
              />
            </View>
  
            <View style={styles.banner}>
              <Banner />
            </View>
  
           <Divider />
  
            <View style={styles.payment}>
  
              <View style={styles.titleContainer}>
                <Text style={[styles.title, {fontSize: theme.fonts.sizeB}]}>Informações no cartão de Crédito</Text>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Número do Cartão</Text>
                  <InputMask
                    type={'custom'}
                    options={{
                      obfuscated: isCreditCardObfuscated,
                      mask: '9999 9999 9999 9999 999',
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
                      <Text style={styles.inputText}>CVV</Text>
                      <CristaliInput 
                        textAlign='center'
                        keyboardType='number-pad'
                        maxLength={4}
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

        <InstallmentModal
          user={user}
          visible={openInstallmentsModal}
          handleInstallmentSelect={handleInstallmentSelect}
          handleInstallmentFinish={handleInstallmentFinish}
          totalInstallments={totalInstallments}
          value={value}
          installment={installment}
          closeModal={closeInstallments}
        />

      </KeyboardAvoidingView>
    );
  }
}