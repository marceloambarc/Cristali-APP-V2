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

export default function App(){
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    WorkSans_400Regular
  });

  if(!fontsLoaded) {
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