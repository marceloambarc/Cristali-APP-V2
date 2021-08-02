import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

import { OrderProps } from "../../components/Order";

import { api } from '../../services/api';
import { COLLECTION_TOKEN } from '../../config/storage';

import { Header } from '../../components/Header';
import { Divider } from '../../components/Divider';
import { CristaliButton } from '../../components/CristaliButton';
import { CheckOutButton } from '../../components/CheckOutButton';
import { MoneyInput } from '../../components/MoneyInput';
import { Loading } from '../../components/Loading';


export function Checkout() {
  const { user, clientToken } = useAuth();
  const [pagSeguroPressed, setPagSeguroPressed] = useState(false);
  const [moneyPressed, setMoneyPressed] = useState(false);
  const [otherPressed, setOtherPressed] = useState(false);

  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [orderNotes, setOrderNotes] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');
  const [qt, setQt] = useState<string | undefined>('');

  const navigation = useNavigation()
  const route = useRoute();
  const orderParams = route.params as OrderProps;

  async function handleSetNewCondition() {
    await api.post(`/order/condition/${orderId}`,{
      condition: 218
    });
  }

  useEffect(() => {
    if(orderParams){
      handleSetNewCondition();
      setOrderId(orderParams.ordem.id);
      setOrderNotes(orderParams.ordem.orderNotes);
      setClientName(orderParams.cliente.clientName);
      setClientPhone(orderParams.cliente.clientPhone);
      setClientEmail(orderParams.cliente.clientEmail);
      setClientNotes(orderParams.cliente.clientNotes);
      setTotalPrice(orderParams.ordem.totalPrice);
      setQt(orderParams.ordem.qt);
    }
    setLoading(false);
  },[orderParams]);

  function validate(){
    if(!pagSeguroPressed && !moneyPressed && !otherPressed) {
      Alert.alert('Selicione um modo de Pagamento.');
    } else {
      if(pagSeguroPressed) {
        handleSendLog(`${user.userName} iniciou Checkou para PAGSEGURO`);
        navigation.navigate('PagSeguro',{
          ordem: {
            id: orderId,
            qt,
            totalPrice,
            orderNotes
          },
          client: {
            clientName,
            clientPhone,
            clientEmail,
            clientNotes,
          }
        });
      } else if(moneyPressed) {
        handleSendLog(`${user.userName} iniciou Checkou para DINHEIRO`);
        navigation.navigate('Money',{
          isMoney: true,
          ordem: {
            id: orderId,
            qt,
            totalPrice,
            orderNotes
          },
          client: {
            clientName,
            clientPhone,
            clientEmail,
            clientNotes,
          }
        });
      } else {
        handleSendLog(`${user.userName} iniciou Checkou para OUTROS MÉTODOS DE PAGAMENTO`);
        navigation.navigate('Money',{
          isMoney: false,
          ordem: {
            id: orderId,
            qt,
            totalPrice,
            orderNotes
          },
          client: {
            clientName,
            clientPhone,
            clientEmail,
            clientNotes,
          }
        });
      }
    }

    async function handleSendLog(logText: string) {
      await api.post('/evento',{
        userCode: user.userCode,
        eventDescription: logText,
        userToken: clientToken,
        deviceToken: COLLECTION_TOKEN
      });
    }
  }

  async function handlePagSeguroPressed(){
    setMoneyPressed(false);
    setOtherPressed(false);
    setPagSeguroPressed(true);
    if(pagSeguroPressed){
      setPagSeguroPressed(false);
    }
  }

  async function handleMoneyPressed(){
    setPagSeguroPressed(false);
    setMoneyPressed(true);
    setOtherPressed(false);
    if(moneyPressed){
      setMoneyPressed(false);
    }
  }

  async function handleOtherPressed(){
    setMoneyPressed(false);
    setPagSeguroPressed(false);
    setOtherPressed(true);
    if(otherPressed){
      setOtherPressed(false);
    }
  }

  if(loading){
    return (
      <Loading />
    )
  } else {
    return (
      <ScrollView>
        <StatusBar
          barStyle='dark-content'
          backgroundColor={theme.colors.input}
        />
        <Header
          title='Checkout'
          haveBack
        />
        <View style={styles.container}>
  
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {fontSize: 18}]}>Total Pedido</Text>
            <MoneyInput
              type={'money'}
              textAlign='center'
              value={totalPrice}
              editable={false}
            />
          </View>
  
          <Divider />
  
          <View style={styles.payment}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, {fontSize: 24}]}>Instruções para Pagamento</Text>
              <Text style={styles.text}>Selecione uma das formas de pagamento {'\n'}
                    abaixo, e aperte Continuar para prosseguir {'\n'}
                    com a venda.
              </Text>
            </View>
          </View>
  
          <View style={styles.buttonsContainer}>
            <View style={styles.checkoutButtonRow}>
              <View style={styles.checkoutButtonCol}>
                <CheckOutButton
                  bcolor={`${theme.colors.text}`}
                  tcolor={`${theme.colors.credit}`}
                  title={`Receber com PagSeguro`}
                  onPress={handlePagSeguroPressed}
                  path={require('../../assets/pagseguro.png')}
                  pressed={pagSeguroPressed}
                />
              </View >
            </View>
            <View style={styles.checkoutButtonRow}>
              <View style={styles.checkoutButtonCol}>
                <CheckOutButton
                  bcolor={`${theme.colors.Success}`}
                  tcolor={`${theme.colors.Success}`}
                  title="Receber com Dinheiro"
                  onPress={handleMoneyPressed}
                  path={require('../../assets/money.png')}
                  pressed={moneyPressed}
                  />
              </View>
            </View>
            <View style={styles.checkoutButtonRow}>
              <View style={styles.checkoutButtonCol}>
                <CheckOutButton
                  bcolor={`${theme.colors.Success}`}
                  tcolor={`${theme.colors.credit}`}
                  title="Outra forma de Pagamento"
                  onPress={handleOtherPressed}
                  path={require('../../assets/payment.png')}
                  pressed={otherPressed}
                  />
              </View>
            </View>
          </View>
  
          <View style={styles.footer}>
            <CristaliButton 
              color={`${theme.colors.Success}`}
              title="Continuar"
              onPress={validate}
            />
          </View>
  
        </View>
      </ScrollView>  
    );
  }
}