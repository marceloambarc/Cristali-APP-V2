import React, { useEffect, useState } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Nunito_800ExtraBold, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';

import { api } from './src/services/api';
import { AuthProvider } from './src/hooks/auth';
import { COLLECTION_DEVICE_TOKEN } from './src/config/storage';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App(){
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    WorkSans_400Regular
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading === false){
      return;
    }else{
      registerForPushNotificationsAsync();
    }
  },[]);

  async function registerForPushNotificationsAsync() {
    let deviceToken;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Erro ao enviar o Token de Notificação!');
        return;
      }
      deviceToken = (await Notifications.getExpoPushTokenAsync()).data;
      sendToken(deviceToken);
    } else {
      Alert.alert('Você deve usar um Dispositivo Físico para utilizar esta aplicação.');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  async function sendToken(deviceToken: string) {
    AsyncStorage.setItem(COLLECTION_DEVICE_TOKEN, JSON.stringify(deviceToken));
    api.post('/token',{
      deviceToken
    }).then(() => {
      setLoading(false);
    }).catch(err => {
      if(err.message.includes("409")) {
        Alert.alert('Celular já cadastrado, Bem-vindo novamente.');
        setLoading(false);
      }else if(err.message.includes("400")) {
        Alert.alert(
          "Bem-Vindo!",
          "Para iniciar o App Cristali, deve-se autorizar as Permissões de acesso ao Telefone.",
          [
            { text: "OK", onPress: () => Linking.openSettings().then(() => {
              setLoading(false);
            }) },
          ]
        );
      } else if(err.message.includes("401")) {
        Alert.alert('Problema de Credenciais!');
      } else {
        Alert.alert('Ops', 'Problema de Conexão, Verifique sua Rede.');
        setLoading(false);
      }
    });
  }

  if(!fontsLoaded || loading) {
    return <Loading />
  }

  return (
    <AuthProvider>
      <Background>
        <Routes />
      </Background>
    </AuthProvider>
  )
}