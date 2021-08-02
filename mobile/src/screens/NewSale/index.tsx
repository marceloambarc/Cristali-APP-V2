import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Alert, TextInput, ActivityIndicator } from "react-native";
import {  useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import { theme } from "../../global";

import { COLLECTION_ITEMS, COLLECTION_DEVICE_TOKEN } from "../../config/storage";
import { OrderProps } from "../../components/Order";

import { Divider } from "../../components/Divider";
import { CristaliInput } from "../../components/CristaliInput";
import { MoneyInput } from "../../components/MoneyInput";
import { TextArea } from "../../components/TextArea";
import { CristaliButton } from "../../components/CristaliButton";
import { Header } from "../../components/Header";
import { SearchButton } from "../../components/SearchButton";
import { Loading } from "../../components/Loading";
import { api } from "../../services/api";

export interface ItemProps {
  id: number;
  gCode: string;
  productName: string;
  price: string;
}

export let itemCounter = 1;

export function NewSale() {
  const [loading, setLoading] = useState(true);
  const { user, clientToken } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const orderParams = route.params as OrderProps;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [sellPrice, setSellPrice] = useState(0);
  const [qt, setQt] = useState(0);

  const [totalPrice, setTotalPrice] = useState('');

  const [isLogSended, setIsLogSended] = useState(false);

  async function removeStorage(){
    try {
      await AsyncStorage.removeItem(COLLECTION_ITEMS);
    }catch(err){
      alert(err);
    }
  }

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

  useEffect(() => {
    if(isLogSended)
      return
    setLoading(true);
    handleLogSend(`${user.userName} INICIOU UMA VENDA PARA ${clientName}.`)
  },[clientName]);

  useEffect(() => {
    removeStorage()
    /*if(orderParams){
      setClientName(orderParams.clientName);
      setClientPhone(orderParams.clientPhone);
      setClientEmail(orderParams.clientEmail);
      setClientNotes(orderParams.clientNotes);
      setTotalPrice(orderParams.price);
    }*/
    setLoading(false);
    
  },[orderParams]);

  const [list, setList] = useState<ItemProps[]>([{id: 0, gCode: '', price: '', productName: ''}]);

  const handleChange = (price: string, id: ItemProps['id']) => {
    setList(prev => prev.map(item => item.id === id? {...item, price} : item));
  }

  const handleTitleChange = (productName: string, id: ItemProps['id']) => {
    setList(prev => prev.map(item => item.id === id? {...item, productName} : item));
  }

  const handleDelete = (id: ItemProps['id'], price: string) => {
    setList(prev => prev.filter(item => item.id !== id));
    setQt(prev => prev -1);
    var value = parseInt(price.replace(/\D/g, ""));
    setSellPrice(value - sellPrice);
  }

  const handleAdd = (index: number, price: string) => {
    const newItem = {id: itemCounter ++, gCode: '', price: '', productName: ''}
    if(price === '') {
      alert('Insira o Preço do Produto.');
    } else {
      var value = parseInt(price.replace(/\D/g, ""));
      setList(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
      setQt(prev => prev + 1);
      setSellPrice(value + sellPrice);
    }
  }

  async function handleSave() {
    for (let index = 0; index <= list.length; index++) {
      if(list[index].productName != undefined) {
        const newItem = {
          gCode: uuid.v4(),
          productName: list[index].productName,
          price: list[index].price
        };

        const storage = await AsyncStorage.getItem(COLLECTION_ITEMS);
        const itens = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
          COLLECTION_ITEMS,
          JSON.stringify([...COLLECTION_ITEMS, newItem])
        );
      } else {
        return;
      }
    }
  }

  function handleContinue() {
    if(qt <= 0) {
      Alert.alert('Insira um Produto.');
    } else {
      handleSave();
      handleLogSend(`${user.userName} INSERIU PRODUTOS / VL_TOTAL: ${sellPrice}.`);
      navigation.navigate('Checkout', {
        clientName,
        clientPhone,
        clientEmail,
        clientNotes,
        qt,
        list: list,
        totalPrice: sellPrice.toString()
      });
    }
  }

  if(loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={(Platform.OS === 'ios')? 7 : 0}
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
                              value={item.price}
                              productInsert
                              editable={false}
                              autoCorrect={false}
                            />
                            <View style={styles.productTitleContainer}>
                              <CristaliInput 
                                value={item.productName}
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
                          value={item.price}
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
                        onPress={() => handleAdd(index, item.price)}
                      >
                        <AntDesign name="plus" size={24} color="white" />
                      </TouchableOpacity>
                    }
                    {list.length > 1 && (
                      <TouchableOpacity
                        style={[styles.listButton, {backgroundColor: theme.colors.Cancel}]}
                        onPress={() => handleDelete(item.id, item.price)}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
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