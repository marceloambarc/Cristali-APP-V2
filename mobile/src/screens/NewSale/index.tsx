import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Alert, TextInput, ActivityIndicator } from "react-native";
import {  useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import { theme } from "../../global";

import { COLLECTION_ITEMS } from "../../config/storage";

import { OrderProps } from "../../components/Order";
import { ClientProps } from "../../components/ClientComponent";

import { api } from "../../services/api";

import { Divider } from "../../components/Divider";
import { CristaliInput } from "../../components/CristaliInput";
import { MoneyInput } from "../../components/MoneyInput";
import { TextArea } from "../../components/TextArea";
import { CristaliButton } from "../../components/CristaliButton";
import { Header } from "../../components/Header";
import { SearchButton } from "../../components/SearchButton";
import { Loading } from "../../components/Loading";
import { AxiosResponse } from "axios";

export interface ItemProps {
  id: number;
  cd_codigogerado: string;
  vl_preco: string;
  nm_produto: string;
}

export let itemCounter = 1;

export function NewSale() {
  const { user, clientToken, sendLog } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const orderParams = route.params as OrderProps;
  const clientParams = route.params as ClientProps;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [clientNumber, setClientNumber] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [orderNotes, setOrderNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [condition, setCondition] = useState(0);

  const [sellPrice, setSellPrice] = useState(0);
  const [qt, setQt] = useState(0);

  const [list, setList] = useState<ItemProps[]>([{id: 0, cd_codigogerado: '', vl_preco: '', nm_produto: ''}]);

  async function removeStorage(){
    try {
      await AsyncStorage.removeItem(COLLECTION_ITEMS);
    }catch(err){
      alert(err);
    }
  }

  useEffect(() => {
    removeStorage()
    if(orderParams) {
      setOrderId(orderParams.id);
      setOrderNotes(orderParams.orderNotes);
      setTotalPrice(orderParams.totalPrice);
      setCondition(orderParams.condition);
      if(orderParams.itens != undefined) {
        const itens = orderParams.itens
        itens.map((item, index) => {
          handleAdd(index, item.vl_preco.toString());
          handleChange(item.vl_preco.toString(), index);
          handleTitleChange(item.nm_produto, index);
        })       
      }
    }

    if(clientParams) {
      setClientName(clientParams.clientName);
      setClientPhone(clientParams.clientPhone);
      setClientEmail(clientParams.clientEmail);
      setClientNotes(clientParams.clientNotes);
    }
    
  },[orderParams, clientParams]);

  const handleChange = (vl_preco: string, id: ItemProps['id']) => {
    setList(prev => prev.map(item => item.id === id? {...item, vl_preco} : item));
  }

  const handleTitleChange = (nm_produto: string, id: ItemProps['id']) => {
    setList(prev => prev.map(item => item.id === id? {...item, nm_produto} : item));
  }

  const handleDelete = (id: ItemProps['id'], vl_preco: string) => {
    setList(prev => prev.filter(item => item.id !== id));
    setQt(prev => prev -1);
    var value = parseInt(vl_preco.replace(/\D/g, ""));
    setSellPrice(sellPrice - value);
  }

  const handleAdd = (index: number, vl_preco: string) => {
    const newItem = {id: itemCounter ++, cd_codigogerado: '', vl_preco: '', nm_produto: ''}
    if(vl_preco === '') {
      alert('Insira o Preço do Produto.');
    } else {
      var value = parseInt(vl_preco.replace(/\D/g, ""));
      setList(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
      setQt(prev => prev + 1);
      setSellPrice(sellPrice => sellPrice + value);
    }
  }

  async function handleSave() {
    for (let index = 0; index <= list.length; index++) {
      if(list[index].vl_preco != undefined && list[index].vl_preco != '') {
        const newItem = {
          cd_codigogerado: uuid.v4(),
          nm_produto: list[index].nm_produto,
          vl_preco: list[index].vl_preco
        };

        const storage = await AsyncStorage.getItem(COLLECTION_ITEMS);
        const itens = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
          COLLECTION_ITEMS,
          JSON.stringify([...itens, newItem])
        );
      } else {
        return;
      }
    }
  }

  async function handleContinue() {
    if(qt <= 0) {
      Alert.alert(
        'Atenção',
        'Insira um Produto'
      );
      return;
    }

    if(clientName === '' || clientName.length < 5) {
      Alert.alert(
        'Atenção',
        'Insira o Nome do Cliente'
      );
      return;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(clientEmail)) {
      if(clientNotes === '' || clientPhone === '' || clientEmail === '') {
        Alert.alert(
          'Atenção!',
          'Deseja prosseguir sem os dados complementares do Cliente?',
          [
            { text: "Sim", onPress: () => handleFinish() },
            {
              text: "Não",
              onPress: () => {},
              style: "cancel"
            }
          ]
        )
      }
      handleFinish();
    } else {
      Alert.alert("OPS!", "Email do cliente é inválido!");
    }
  }

  function handleFinish() {
    handleSave();
    const logText = `${user.userName} INICIOU UMA VENDA PARA ${clientName} / VL TOTAL ${sellPrice.toString()}.`;
    sendLog({logText, clientToken});
    handleOrder();
  }

  async function handleOrder() {
    if(orderId != 0) {
      handleEditOrder()
    } else {
      handleCreateOrder()
    }
  }

  async function handleEditOrder() {
    api.put(`/order/${orderId}`,{
      userCode: user.userCode,
      totalPrice: sellPrice,
      orderNotes,
      client: {
        clientName,
        clientPhone,
        clientEmail,
        clientNotes,
        userCode: user.userCode
      },
      itens: list
    },{
      headers: {'Authorization': 'Bearer '+clientToken}
    }).then(res => {
      handleNavigate(res);
    }).catch(err => {
      Alert.alert(
        'Erro Criação ORDEM',
        `${err}`
      )
    });
  }

  async function handleCreateOrder() {
    api.post(`/order`,{
      userCode: user.userCode,
      totalPrice: sellPrice,
      orderNotes,
      client: {
        clientName,
        clientPhone,
        clientEmail,
        clientNotes,
        userCode: user.userCode
      },
      itens: list
    },{
      headers: {'Authorization': 'Bearer '+clientToken}
    }).then(res => {
      handleNavigate(res);
    }).catch(err => {
      Alert.alert(
        'Erro Criação ORDEM',
        `${err}`
      )
    });
  }

  function handleNavigate(res : AxiosResponse<any>) {
    navigation.navigate('Checkout', {
      id: res.data.cd_id,
      clientName,
      clientPhone,
      clientEmail,
      clientNotes,
      orderNotes,
      qt,
      list: list,
      totalPrice: sellPrice.toString()
    });
  }

  if(loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={(Platform.OS === 'ios')? 5 : 0}
        contentContainerStyle={{backgroundColor: 'transparent'}}
        behavior={(Platform.OS === 'ios')? "padding" : undefined}
      >
        <StatusBar
          barStyle='dark-content'
          backgroundColor={theme.colors.input}
        />
        <Header
          title='Nova Venda'
          haveClose
        />
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <View
            style={styles.container}
          >
            <View style={styles.clientArea}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Dados do cliente</Text>
                <SearchButton
                  color={`${theme.colors.Config}`}
                  onPress={() => navigation.navigate('Client')}
                />
              </View>
              <Divider />
  
              <View style={styles.clientData}>
  
                <View style={styles.clientInput}>
                  <View style={styles.inputTextRow}>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputBannerText}>
                        Nome
                      </Text>
                    </View>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputLabel}>
                        Máximo de 50 caracteres
                      </Text>
                    </View>
                  </View>
                  <CristaliInput 
                    clientInput
                    value={clientName}
                    onChangeText={setClientName}
                    autoCorrect={false}
                    returnKeyType='done'
                    autoCapitalize='words'
                  />
                </View>
  
                <View style={styles.clientInput}>
                  <View style={styles.inputTextRow}>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputBannerText}>
                        Telefone
                      </Text>
                    </View>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputLabel}>
                        Máximo de 9 caracteres
                      </Text>
                    </View>
                  </View>
                  <CristaliInput 
                    clientInput
                    value={clientPhone}
                    onChangeText={setClientPhone}
                    autoCorrect={false}
                    keyboardType='phone-pad'
                    returnKeyType='done'
                  />
                </View>
  
                <View style={styles.clientInput}>
                  <View style={styles.inputTextRow}>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputBannerText}>
                        Email
                      </Text>
                    </View>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputLabel}>
                        Máximo de 50 caracteres
                      </Text>
                    </View>
                  </View>
                  <CristaliInput 
                    clientInput
                    value={clientEmail}
                    onChangeText={setClientEmail}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='done'
                    autoCapitalize='none'
                  />
                </View>
                
                <View style={styles.clientInput}>
                  <View style={styles.inputTextRow}>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputBannerText}>
                        Anotações
                      </Text>
                    </View>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputLabel}>
                        Máximo de 100 caracteres
                      </Text>
                    </View>
                  </View>
                  <TextArea 
                    multiline
                    maxLength={100}
                    numberOfLines={5}
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={clientNotes}
                    onChangeText={setClientNotes}
                    returnKeyType='done'
                    scrollEnabled={false}
                  />
                </View>
  
                <View style={[styles.titleContainer, {justifyContent: 'center', alignItems: 'center'}]}>
                  <Text style={styles.title}>Produtos</Text>
                </View>
  
                <Divider />
  
                <View style={styles.orderRow}>
                  <View style={styles.orderCol}>
                    <Text style={styles.orderText}>Peças</Text>
                    <CristaliInput
                      textAlign='center'
                      value={qt.toString()}
                      editable={false}
                      autoCorrect={false}
                    />
                  </View>
                  <View style={styles.orderCol}>
                    <Text style={styles.orderText}>Preço</Text>
                    <MoneyInput
                      type={'money'}
                      textAlign='center'
                      value={sellPrice.toString()}
                      editable={false}
                      autoCorrect={false}
                    />
                  </View>
                </View>
  
                <Divider />
  
                <View style={styles.productContainer}>
                  
                  {list.map((item, index) => (
                    <View
                      key={item.id}
                      style={styles.list}
                    >
                      <View
                        key={item.id}
                        style={{width: Dimensions.get('window').width *.6}}
                      >
                        {index <= qt -1 ?
                          <View style={styles.listProdutContainer}>
                            <View style={styles.sellPriceContainer}>
                              <MoneyInput
                                type={'money'}
                                key={item.id}
                                value={item.vl_preco}
                                productInsert
                                editable={false}
                                autoCorrect={false}
                              />
                              <View style={styles.productTitleContainer}>
                                <CristaliInput 
                                  value={item.nm_produto}
                                  onChangeText={e => handleTitleChange(e, item.id)}
                                  placeholder="Produto..."
                                  clientInput
                                  autoCorrect={false}
                                />
                              </View>
                            </View>
                          </View>
  
                          :
  
                          <MoneyInput
                            type={'money'}
                            key={item.id}
                            value={item.vl_preco}
                            onChangeText={e => handleChange(e, item.id)}
                            placeholder='Insira o Valor do Produto'
                            keyboardType='numeric'
                            autoCorrect={false}
                          />
                          
                        }
                      </View>
                      {index <= qt -1 ?
                        <View />
                        :
                        <TouchableOpacity
                          style={[styles.listButton, {backgroundColor: theme.colors.Success}]}
                          onPress={() => handleAdd(index, item.vl_preco)}
                        >
                          <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                      }
                      {index < list.length - 1 && (
                        <TouchableOpacity
                          style={[styles.listButton, {backgroundColor: theme.colors.Cancel}]}
                          onPress={() => handleDelete(item.id, item.vl_preco)}
                        >
                          <AntDesign name="minus" size={24} color="black" />
                      </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
  
                <Divider />
  
                <View style={[styles.clientInput, {marginTop: Dimensions.get('screen').height * 0.03, marginBottom: Dimensions.get('screen').height * 0.03}]}>
                  <View style={styles.inputTextRow}>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputBannerText}>
                        Anotações da Venda
                      </Text>
                    </View>
                    <View style={styles.inputTextCol}>
                      <Text style={styles.inputLabel}>
                        Máximo de 50 caracteres
                      </Text>
                    </View>
                  </View>
                  <TextArea 
                    multiline
                    maxLength={50}
                    numberOfLines={5}
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={orderNotes}
                    onChangeText={setOrderNotes}
                    returnKeyType='done'
                  />
                </View>
  
                <Divider />
  
                <View style={styles.footer}>
                  <View>
                    <CristaliButton 
                      title="Continuar"
                      color={`${theme.colors.Success}`}
                      onPress={handleContinue}
                    />
                  </View>
                </View>
  
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}