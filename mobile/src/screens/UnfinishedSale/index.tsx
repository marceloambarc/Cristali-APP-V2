import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  const [loading, setLoading] = useState(true);

  const [unfinisedSales, setUnfinishedSales] = useState<OrderProps[]>([]);

  const [searchOrderId, setSearchOrderId] = useState('0');
  const [searchClientName, setSearchClientName] = useState('');
  const [searchClientPhone, setSearchClientPhone] = useState('');
  const [searchClientEmail, setSearchClientEmail] = useState('');
  const [searchClientNotes, setSearchClientNotes] = useState('');

  const navigation = useNavigation();

  async function loadUnfinishedSales() {
    api.post('order/primary',{
      condition: 0
    }).then(res => {
      setUnfinishedSales(res.data);
    }).catch(err => {
      console.warn(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    if(!loading) {
      return;
    } else {
      loadUnfinishedSales();
    }
  },[]);

  function handleOrderSelect(orderSelect: OrderProps){
    alert('TODO handleOrderSelect');
    /*setSearchNumber(orderSelect.number);
    setSearchName(orderSelect.client);
    setSearchTelephone(orderSelect.telephone);
    setSearchEmail(orderSelect.email);
    setSearchNotes(orderSelect.notes);*/
  }

  function handleLoadSale(){
    alert('TODO handleLoadSale')
    /*navigation.navigate('NewSale',{
      number: searchNumber,
      client: searchName,
      telephone: searchTelephone,
      email: searchEmail,
      notes: searchNotes
    });*/
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
            value={searchOrderId}
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