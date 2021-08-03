import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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

export function PagSeguroScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const orderParams = route.params as OrderProps;
  const clientParams = route.params as ClientProps;

  const [loading, setLoading] = useState(true);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientNotes] = useState('');
  const [clientNotes, setClientEmail] = useState('');

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirate, setExpirate] = useState('');
  const [expirateMonth, setExpirateMonth] = useState('');
  const [expirateYear, setExpirateYear] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    if(orderParams){
      setClientName(clientParams.clientName);
      setClientPhone(clientParams.clientPhone);
      setClientNotes(clientParams.clientNotes);
      setClientEmail(clientParams.clientEmail);
    }
    setLoading(false);
  },[orderParams]);

  function validate() {
    if(cardName!= '' && cardName != undefined){
      if(cardNumber != '' && cardNumber != undefined){
        if(expirate != '' && expirate != undefined){
          setExpirateMonth(expirate.split('/')[0]);
          setExpirateYear(expirate.split('/')[1]);
          if(cvv != '' && cvv != undefined){
            handleConcludeSale();
            //handleVerify()
          }else{
            alert('Insira do Código de Verificação do Cartão de Crédito');
          }
        }else{
          alert('Insira a Data de Validade do Cartão de Crédito');
        }
      }else{
        alert('Insira o Número do Cartão de Crédito');
      }
    }else{
      alert('Insira o Nome Impresso no Cartão');
    }
  }

  function handleConcludeSale() {
    //handleSendPagSeguro()
    //handleSendOrderPayment()
    navigation.setParams({orderParams: null});
    navigation.navigate('Final');
  }

  if(loading){
    return (
      <Loading />
    );
  } else {
    return (
      <ScrollView>
        <StatusBar
          barStyle='dark-content'
          backgroundColor={theme.colors.input}
        />
        <Header
          title='Pagamento'
          haveBack
        />
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
                <CristaliInput 
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
                    <CristaliInput
                      textAlign='center'
                      maxLength={7}
                      value={expirate}
                      onChangeText={setExpirate}
                      keyboardType='numbers-and-punctuation'
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
              title="Finalizar"
              color={`${theme.colors.Success}`}
              onPress={validate}
            />
          </View>   
        </View>
      </ScrollView>
    );
  }
}