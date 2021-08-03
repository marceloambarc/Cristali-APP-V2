import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { COLLECTION_DEVICE_TOKEN } from "../../config/storage";

import { Header } from "../../components/Header";
import { CristaliButton } from "../../components/CristaliButton";
import { CristaliInput } from "../../components/CristaliInput";
import { Divider } from "../../components/Divider";
import { OrderList } from "../../components/OrderList";
import { Loading } from "../../components/Loading";

import { OrderProps } from "../../components/Order";

import { styles } from "./styles";
import { theme } from "../../global";
import { useEffect } from "react";

import { api } from "../../services/api";
import { Alert } from "react-native";

export function UnfinishedSale() {
  const { user, clientToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const [unfinisedSales, setUnfinishedSales] = useState<OrderProps[]>([]);

  const [searchOrderId, setSearchOrderId] = useState(0);
  const [searchTotalPrice, setTotalPrice] = useState('');
  const [searchCondition, setCondition] = useState(0);
  const [searchOrderNotes, setSearchOrderNotes] = useState('');

  const [isLogSended, setIsLogSended] = useState(false);

  const navigation = useNavigation();

  const logText =`${user.userName} CONSULTOU VENDAS SALVAS.`;

  async function loadUnfinishedSales() {
    const response = await api.get(`/myOrders/saved/${user.userCode}`);
    setUnfinishedSales(response.data);
    setLoading(false);
  }

  async function handleLogSend() {
    if(isLogSended)
      return;
    api.post('/evento',{
      userCode: user.userCode,
      eventDescription: logText,
      userToken: clientToken,
      deviceToken: COLLECTION_DEVICE_TOKEN
    },{
      headers: { 'Authorization' : 'Bearer '+clientToken }
    }).then(() => {
      setIsLogSended(true);
      Alert.alert('Envio de LOG DE SALVAS')
    }).catch(err => {
      setIsLogSended(false);
      Alert.alert(
        'Erro',
        `${err}`,
      );
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    if(!loading) {
      return;
    } else {
      loadUnfinishedSales();
      handleLogSend();
    }
  },[]);

  function handleOrderSelect(orderSelect: OrderProps){
    setSearchOrderId(orderSelect.id);
    setSearchOrderNotes(orderSelect.orderNotes);
    setTotalPrice(orderSelect.totalPrice);
    setCondition(orderSelect.condition);
  }

  function handleLoadSale(){
    navigation.navigate('NewSale',{
      searchOrderId,
      searchOrderNotes,
      searchTotalPrice,
      searchCondition
    });
  }

  if(loading) {
    return (
      <Loading />
    );
  }
  return (
    <>
    <StatusBar
      barStyle='dark-content'
      backgroundColor={theme.colors.input}
    />
    <Header
      title='Vendas Abertas'
      haveClose
    />
    <View style={styles.container}>


      <View style={styles.searchContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Número da Venda</Text>
        </View>
        <View style={styles.inputContainer}>
          <CristaliInput 
            value={searchOrderId.toString()}
            textAlign='center'
            editable={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CristaliButton 
            title='Carregar'
            color={`${theme.colors.Continue}`}
            onPress={handleLoadSale}
          />
        </View>
      </View>

      <Divider />

      <View style={styles.list}>
        <OrderList
          data={unfinisedSales}
          handleOrderSelect={handleOrderSelect}
        />
      </View>

    </View>
    </>
  );
}