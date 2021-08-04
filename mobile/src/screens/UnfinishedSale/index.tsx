import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

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

export function UnfinishedSale() {
  const { user, clientToken, sendLog } = useAuth();
  const logText = `${user.userName} CONSULTOU VENDAS SALVAS.`;
  const [loading, setLoading] = useState(true);

  const [unfinisedSales, setUnfinishedSales] = useState<OrderProps[]>([]);

  const [searchOrderId, setSearchOrderId] = useState(0);
  const [searchTotalPrice, setTotalPrice] = useState('');
  const [searchCondition, setCondition] = useState(0);
  const [searchOrderNotes, setSearchOrderNotes] = useState('');

  const navigation = useNavigation();

  async function loadUnfinishedSales() {
    const response = await api.get(`/myOrders/saved/${user.userCode}`);
    setUnfinishedSales(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if(!loading)
      return;
    loadUnfinishedSales();
    sendLog({logText, clientToken});
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