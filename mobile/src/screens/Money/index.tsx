import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../../hooks/auth';

import { CristaliButton } from '../../components/CristaliButton';
import { CristaliInput } from '../../components/CristaliInput';

import { COLLECTION_ITEMS } from '../../config/storage';

import { ItemProps } from '../NewSale';
import { OrderProps } from '../../components/Order';
import { ClientProps } from '../../components/ClientComponent';
import { Loading } from '../../components/Loading';

import { styles } from './styles';
import { theme } from '../../global';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface MoneyProps {
  isMoney?: boolean
}

export function Money() {
  const { user, clientToken, sendLog, handleSetNewCondition } = useAuth();
  const navigation = useNavigation();

  const route = useRoute();
  const orderParams = route.params as OrderProps;
  const moneyParams = route.params as MoneyProps;
  const clientParams = route.params as ClientProps;

  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [list, setList] = useState<ItemProps[]>([]);

  const [clientName, setClientName] = useState('');
  const [clientCgc, setClientCgc] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [orderNotes, setOrderNotes] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');
  const [qt, setQt] = useState<string | undefined>('');

  const isMoney = moneyParams.isMoney;

  function handleFinal() {
    const notes = paymentMethod + ' ' + orderParams.orderNotes;
    if(isMoney) {
      const logText = `${user.userName} FINALIZOU UMA VENDA PARA ${paymentMethod}.`;
      sendLog({logText, clientToken});
      handleSetNewCondition({id: orderId,condition: 223});
      handleNavigation();
    } else {
      const logText = `${user.userName} FINALIZOU UMA VENDA EM DINHEIRO.`;
      sendLog({logText, clientToken});
      handleSetNewCondition({id: orderId,condition: 224});
      handleNavigation();
    }
  }

  function handleNavigation() {
    navigation.navigate('Final');
  }

  async function loadItems() {
    const response = await AsyncStorage.getItem(COLLECTION_ITEMS);
    const storage: ItemProps[] = response ? JSON.parse(response) : [];

    setList(storage)
    setLoading(false);
  }

  useEffect(() => {
    if(orderParams){
      setOrderId(orderParams.id);
      setOrderNotes(orderParams.orderNotes);
      setTotalPrice(orderParams.totalPrice);
      setQt(orderParams.qt);
    }

    if(clientParams) {
      setClientName(clientParams.clientName);
      setClientCgc(clientParams.clientCgc);
      setClientPhone(clientParams.clientPhone);
      setClientEmail(clientParams.clientEmail);
      setClientNotes(clientParams.clientNotes);
    }
    setLoading(false);
  },[orderParams, clientParams]);

  useFocusEffect(useCallback(() => {
    loadItems();
  },[]));

  if(loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={{flexGrow: 1}}
        keyboardVerticalOffset={(Platform.OS === 'ios')? 0 : 0}
        contentContainerStyle={{backgroundColor: 'transparent'}}
        behavior={ Platform.OS === 'ios'? 'padding' : undefined }
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.container}>
  
            <View style={styles.banner}>
              <Text style={styles.title}>Aten????o {user?.userName}</Text>
              <Text style={styles.text}>
                Voc?? est?? recebendo com outra forma de 
                pagamento sem ser pelo PAGSEGURO, ao 
                confirmar esta transa????o, n??o significa que a
                empresa ir?? receber o valor,
  
                O valor deve ser acertado posteriormente 
                com o departamento financeiro da Cristali.
              </Text>
  
            </View>
  
            {
              isMoney
              ?
              <View />
              :
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Digite a forma de pagamento.</Text>
                <CristaliInput 
                  clientInput
                  value={paymentMethod}
                  onChangeText={setPaymentMethod}
                />
              </View>
            }
  
  
            {
              loading
              ?
                <ActivityIndicator color={`${theme.colors.primary}`} size='large' style={{marginTop: 70}} />
              :
  
                <View style={styles.footer}>
                  <CristaliButton 
                    color={`${theme.colors.Success}`}
                    title="Finalizar"
                    onPress={handleFinal}
                  />
                </View>
            }
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
