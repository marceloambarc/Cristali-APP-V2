import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { Background } from '../../components/Background';
import { Logo } from '../../components/Logo';
import { Loading } from '../../components/Loading';
import { CristaliButton } from '../../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../../global';
import { COLLECTION_DEVICE_TOKEN } from '../../config/storage';
import { api } from '../../services/api';

export function Home(){
  const { user, clientToken, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isLogSended, setIsLogSended] = useState(false);
  const logText = `${user.userName} ENTROU NO SISTEMA.`

  const navigation = useNavigation();

  function handleHistoryNavigation(){
    navigation.navigate('History');
  }

  function handleSavedSaleNavigation(){
    navigation.navigate('UnfinishedSale');
  }

  function handleNewSaleNavigation(){
    navigation.navigate('NewSale');
  }

  async function handleSignOut(){
    signOut();
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
      Alert.alert('Evento enviado.');
    }).catch(res => {
      setIsLogSended(false);
      Alert.alert('Evento Não enviado.');
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    if(!loading)
      return;
    handleLogSend()
  },[]);

  if(loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo 
              subtext
            />
          </View>
  
  
          <View style={styles.banner}>
            <Text style={styles.username}>{ user?.userName }</Text>
          </View>
  
          <View style={styles.painel}>
            <View style={styles.painelButton}>
              <CristaliButton 
                color={`${theme.colors.Config}`} 
                title="Histórico"
                onPress={handleHistoryNavigation}
              />
            </View>
            <View style={styles.painelButton}>
              <CristaliButton 
                color={`${theme.colors.Continue}`} 
                title="Carregar Venda"
                onPress={handleSavedSaleNavigation}
              />
            </View>
            <View style={styles.painelButton}>
              <CristaliButton
                color={`${theme.colors.Continue}`} 
                title="Nova Venda" 
                onPress={handleNewSaleNavigation}
              />
            </View>
          </View>
  
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <CristaliButton 
                color={`${theme.colors.Cancel}`} 
                title="Sair"
                onPress={handleSignOut}
              />
            </View>
            <View style={styles.footerRow}>
  
            </View>
            
          </View>
         
        </View>
      </Background>
    );
  }
}