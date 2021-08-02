import React, { useState, useCallback } from 'react';
import { Text, View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../../hooks/auth';

import { CristaliButton } from '../../components/CristaliButton';
import { CristaliInput } from '../../components/CristaliInput';

import { COLLECTION_ITEMS, COLLECTION_DEVICE_TOKEN } from '../../config/storage';
import { ItemProps } from '../NewSale';
import { OrderProps } from '../../components/Order';

import { styles } from './styles';
import { theme } from '../../global';
import { api } from '../../services/api';

interface MoneyProps {
  isMoney?: boolean
}

interface ItemsOutProps {
  gCode: string;
  price: string;
  productName: string;
}

export function MoneyScreen() {
  const { user, clientToken } = useAuth();
  const navigation = useNavigation();

  const route = useRoute();
  const orderParams = route.params as OrderProps;
  const [loading, setLoading] = useState(true);
  const [isLogSended, setIsLogSended] = useState(false);
  const [items, setItems] = useState<ItemsOutProps[]>([]);

  const moneyParams = route.params as MoneyProps;
  const isMoney = moneyParams.isMoney;

  const [paymentMethod, setPaymentMethod] = useState('');

  async function handleLogSend(logText: string) {
    if(isLogSended)
    return;
    api.post('evento',{
      userCode: user.userCode,
      eventDescription: logText,
      userToken: clientToken,
      deviceToken: COLLECTION_DEVICE_TOKEN
    }).then(() => {
      setIsLogSended(true);
    }).catch(res => {
      setIsLogSended(false);
    }).finally(() => {
      setLoading(false);
    });
  }

  function handleFinal() {
    const notes = paymentMethod + ' ' + orderParams.ordem.orderNotes;
    handleSetNewCondition(221);
    if(isMoney) {
      handleLogSend(`${user.userName} Finalizou uma venda por ${paymentMethod}.`);
      navigation.setParams({ moneyParams: null });
      navigation.navigate('Final');
    } else {
      handleLogSend(`${user.userName} Finalizou uma venda por Dinheiro.`);
      navigation.setParams({moneyParams: null});
      navigation.navigate('Final');
    }
  }

  async function handleSetNewCondition(condition: number) {
    await api.post(`/order/condition/${orderParams.ordem.id}`,{
      condition: condition
    });
  }

  async function loadItems() {
    const response = await AsyncStorage.getItem(COLLECTION_ITEMS);
    const storage: ItemProps[] = response ? JSON.parse(response) : [];

    setItems(storage)
    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadItems();
    handleSetNewCondition(219);
  },[]));

  return (
    <KeyboardAvoidingView
      style={{flexGrow: 1}}
      keyboardVerticalOffset={(Platform.OS === 'ios')? 0 : 0}
      contentContainerStyle={{backgroundColor: 'transparent'}}
      behavior={ Platform.OS === 'ios'? 'padding' : undefined }
    >
      <View style={styles.container}>

        <View style={styles.banner}>
          <Text style={styles.title}>Atenção {user?.userName}</Text>
          <Text style={styles.text}>
            Você está recebendo com outra forma de 
            pagamento sem ser pelo PAGSEGURO, ao 
            confirmar esta transação, não significa que a
            empresa irá receber o valor,

            O valor deve ser acertado posteriormente 
            com o departamento financeiro da Cristali.
          </Text>

          {
          items.map(item => {
            return (
              <Text key={item.gCode} style={{color: 'black'}}>{item.gCode}, {item.productName}, {item.price}</Text>
            )
          })
        }

        </View>

        {
          isMoney?
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
          loading?
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
    </KeyboardAvoidingView>
  );
}
