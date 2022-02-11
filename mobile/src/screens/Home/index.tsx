import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { versionCode } from '../../config/options';

import { api } from '../../services/api';

import { Background } from '../../components/Background';
import { Logo } from '../../components/Logo';
import { CristaliButton } from '../../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../../global';

export function Home(){
  const { user, clientToken, isSignInLogSended, sendLoginLog, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

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

  async function deleteHistory() {
    await api.delete(`/order`,{
      headers: { 'Authorization' : 'Bearer '+clientToken }
    }).catch(() => {
      return;
    });
  }

  useEffect(() => {
    if(!loading)
      return;
    if(isSignInLogSended) {
      deleteHistory()
      setLoading(false);
      return;
    } else {
      sendLoginLog(clientToken).then(() => {
        deleteHistory()
        setLoading(false);
      });
    }
  },[]);

    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo
              subtext
              versionCode={versionCode}
            />
          </View>
  
          {
            loading? <ActivityIndicator style={{marginTop: 100}} size='large' color={`${theme.colors.primary}`} />
            :
            <>
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
            </>
          }
         
        </View>
      </Background>
    );
}