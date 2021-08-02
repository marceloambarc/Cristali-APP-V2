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
import { ClientProps } from "../../components/ClientComponent";

export function UnfinishedSale() {
  const { user, clientToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const [unfinisedSales, setUnfinishedSales] = useState<OrderProps[]>([]);

  const [searchOrderId, setSearchOrderId] = useState(0);
  const [searchTotalPrice, setTotalPrice] = useState('');
  const [searchCondition, setCondition] = useState(0);
  const [searchOrderNotes, setSearchOrderNotes] = useState('');

  const [searchClienteName, setSearchClienteName] = useState('');
  const [searchClientPhone, setSearchClientPhone] = useState('');
  const [searchClientEmail, setSearchClientEmail] = useState('');
  const [searchClientNotes, setSearchClientNotes] = useState('');

  const [isLogSended, setIsLogSended] = useState(false);

  const navigation = useNavigation();

  async function loadUnfinishedSales() {
    api.post(`/myOrders/saved/${user.userCode}`,{
        condition: 0
    }).then(res => {
      setUnfinishedSales(res.data);
    }).catch(err => {
      console.warn(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  async function handleLogSend(logText: string) {
    if(isLogSended)
      return;
    api.post('/evento',{
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

  useEffect(() => {
    if(!loading) {
      return;
    } else {
      loadUnfinishedSales();
      handleLogSend(`${user.userName} Consultou Vendas Salvas.`);
    }
  },[]);

  function handleOrderSelect(orderSelect: OrderProps){
    setSearchOrderId(orderSelect.ordem.id);
    setSearchOrderNotes(orderSelect.ordem.orderNotes);
    setTotalPrice(orderSelect.ordem.totalPrice);
    setCondition(orderSelect.ordem.condition);

    setSearchClienteName(orderSelect.cliente.clientName);
    setSearchClientPhone(orderSelect.cliente.clientPhone);
    setSearchClientEmail(orderSelect.cliente.clientEmail);
    setSearchClientNotes(orderSelect.cliente.clientNotes);
  }

  function handleLoadSale(){
    navigation.navigate('NewSale',{
      ordem: {
        searchOrderId,
        searchOrderNotes,
        searchTotalPrice,
        searchCondition
      },
      cliente: {
        searchClienteName,
        searchClientPhone,
        searchClientEmail,
        searchClientNotes
      }
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