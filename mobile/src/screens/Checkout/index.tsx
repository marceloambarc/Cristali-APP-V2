import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

import { OrderProps } from "../../components/Order";
import { ClientProps } from '../../components/ClientComponent';

import { Header } from '../../components/Header';
import { Divider } from '../../components/Divider';
import { CristaliButton } from '../../components/CristaliButton';
import { CheckOutButton } from '../../components/CheckOutButton';
import { MoneyInput } from '../../components/MoneyInput';
import { Loading } from '../../components/Loading';

export function Checkout() {
  const { user, clientToken, sendLog, handleSetNewCondition } = useAuth();
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
  const clientParams = route.params as ClientProps;

  useEffect(() => {
    if(orderParams){
      setOrderId(orderParams.id);
      setOrderNotes(orderParams.orderNotes);
      setTotalPrice(orderParams.totalPrice);
      setQt(orderParams.qt);
      handleSetNewCondition({id: orderParams.id, condition: 218});
    }
    if(clientParams) {
      setClientName(clientParams.clientName);
      setClientPhone(clientParams.clientPhone);
      setClientEmail(clientParams.clientEmail);
      setClientNotes(clientParams.clientNotes);
    }
    setLoading(false);
  },[orderParams, clientParams]);

  function validate(){
    if(!pagSeguroPressed && !moneyPressed && !otherPressed) {
      Alert.alert('Selicione um modo de Pagamento.');
    } else {
      if(pagSeguroPressed) {
        const logText = `${user.userName} INICIOU CHECKOUT PARA PAGSEGURO`;
        sendLog({logText, clientToken});
        handleSetNewCondition({id: orderParams.id, condition: 219});
        navigation.navigate('PagSeguro',{
          id: orderId,
          clientName,
          clientPhone,
          clientEmail,
          clientNotes,
          qt,
          totalPrice
        });
      } else if(moneyPressed) {
        const logText = `${user.userName} INICIOU CHECKOUT PARA DINHEIRO`;
        sendLog({logText, clientToken});
        handleSetNewCondition({id: orderParams.id, condition: 219});
        navigation.navigate('Money',{
          isMoney: true,
          id: orderId,
          clientName,
          clientPhone,
          clientEmail,
          clientNotes,
          qt,
          totalPrice
        });
      } else {
        const logText = `${user.userName} INICIOU CHECKOU PARA OUTROS MÉTODOS DE PAGAMENTO`;
        sendLog({logText, clientToken});
        handleSetNewCondition({id: orderParams.id, condition: 219});
        navigation.navigate('Money',{
          isMoney: false,
          id: orderId,
          clientName,
          clientPhone,
          clientEmail,
          clientNotes,
          qt,
          totalPrice
        });
      }
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