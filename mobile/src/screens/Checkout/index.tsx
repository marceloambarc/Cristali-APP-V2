import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../global';

import { OrderProps } from "../../components/Order";

import { Header } from '../../components/Header';
import { Divider } from '../../components/Divider';
import { CristaliButton } from '../../components/CristaliButton';
import { CheckOutButton } from '../../components/CheckOutButton';
import { MoneyInput } from '../../components/MoneyInput';

export function Checkout() {
  const [pagSeguroPressed, setPagSeguroPressed] = useState(false);
  const [moneyPressed, setMoneyPressed] = useState(false);
  const [otherPressed, setOtherPressed] = useState(false);

  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [totalPrice, setTotalPrice] = useState('');
  const [qt, setQt] = useState('');

  const navigation = useNavigation()
  const route = useRoute();
  const orderParams = route.params as OrderProps;

  useEffect(() => {
    /*if(orderParams){
      setClientName(orderParams.);
      setClientPhone(orderParams.telephone);
      setClientEmail(orderParams.email);
      setClientNotes(orderParams.notes);
      setTotalPrice(orderParams.price);
      setTotalPiece(orderParams.piece);
    }*/
    setLoading(false);
  },[orderParams]);

  function validate(){
    if(!pagSeguroPressed && !moneyPressed && !otherPressed) {
      Alert.alert('Selicione um modo de Pagamento.');
    } else {
      if(pagSeguroPressed) {
        navigation.navigate('PagSeguro',{
          clientName,
          clientPhone,
          clientEmail,
          clientNotes,
          totalPrice,
          qt
        });
      } else if(moneyPressed) {
        navigation.navigate('Money',{
          isMoney: true,
          clientName,
          clientPhone,
          clientEmail,
          clientNotes,
          totalPrice,
          qt,
        });
      } else {
        navigation.navigate('Money',{
          isMoney: false,
          clientName,
          clientPhone,
          clientEmail,
          clientNotes,
          totalPrice,
          qt,
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