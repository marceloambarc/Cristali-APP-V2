import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { Header } from "../../components/Header";
import { Divider } from "../../components/Divider";
import { ClientList } from "../../components/ClientList";
import { CristaliInput } from "../../components/CristaliInput";
import { CristaliButton } from "../../components/CristaliButton";
import { Loading } from "../../components/Loading";

import { ClientProps } from "../../components/ClientComponent";

import { styles } from "./styles";
import { theme } from "../../global";

import { api } from "../../services/api";

export function Client() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<ClientProps[]>([])

  const [searchId, setSearchId] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchCgc, setSearchCgc] = useState('');
  const [searchTelephone, setSearchTelephone] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchNotes, setSearchNotes] = useState('');

  const [allowPress, setAllowPress] = useState(false);

  const navigation = useNavigation();

  async function getClients() {
    const response = await api.get(`/myClients/${user.userCode}`);
    setClients(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if(!loading)
    return;
    getClients()
    if(searchName != '' && searchName != undefined) {
      setAllowPress(true);
    }else{
      setAllowPress(false);
    }
  },[searchName]);

  function handleClientSelect(clientSelect: ClientProps){
    setSearchId(clientSelect.id);
    setSearchName(clientSelect.clientName);
    setSearchCgc(clientSelect.clientCgc);
    setSearchTelephone(clientSelect.clientPhone);
    setSearchEmail(clientSelect.clientEmail);
    setSearchNotes(clientSelect.clientNotes);
  }

  function validate(){
    if(searchName != '' && searchName != undefined){
      handleSelect();
    }else{
      Alert.alert('Selecione um Cliente.');
    }
  }

  function handleSelect(){
    navigation.navigate('NewSale',{
      clientName: searchName,
      clientCgc: searchCgc,
      clientPhone: searchTelephone,
      clientEmail: searchEmail,
      clientNotes: searchNotes
    });
  }

  if(loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={theme.colors.input}
      />
      <Header
        title='Clientes'
        haveBack
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Selecione o Cliente</Text>
          </View>
        </View>
  
        <Divider />
  
        <View style={styles.clientList}>
          <ClientList
            data={clients}
            handleClientSelect={handleClientSelect}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <CristaliInput 
            value={searchName}
            textAlign='center'
          />
        </View>
  
        {
          allowPress?
          <CristaliButton
            title="Selecionar"
            color={theme.colors.Config}
            onPress={validate}
          />
          :      
          <CristaliButton 
            title="Selecionar"
            color={theme.colors.ContinueDesactivated}
            onPress={validate}
          />
        }
      </View>
      </>
    );
  }
}