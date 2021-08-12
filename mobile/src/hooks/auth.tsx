import React, { createContext, useState, useContext, ReactNode } from "react";
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLLECTION_USER, COLLECTION_TOKEN, COLLECTION_DEVICE_TOKEN } from "../config/storage";
import { testParams } from "../config/options";
import { api } from '../services/api';

export interface UserProps {
  id?: number;
  isActive?: number;
  password: string;
  userCode?: string;
  userName?: string;
  cgc: string;
}

interface AuthProps {
  children: ReactNode
}

interface LogProps {
  logText: string,
  clientToken: string
}

interface ConditionProps {
  id: number;
  condition: number;
}

interface AuthContextData {
  signed: boolean;
  user: UserProps;
  clientToken: string;
  loading: boolean;
  isSignInLogSended: boolean;
  signIn({cgc, password} : UserProps): Promise<void>;
  signOut: () => Promise<void>;
  sendLog({logText, clientToken} : LogProps): Promise<void>;
  sendLoginLog(clientToken : string): Promise<void>;
  handleSetNewCondition({id, condition} : ConditionProps) : Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [clientToken, setClientToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignInLogSended, setIsSignInLogSended] = useState(false);
  
  async function signIn({ cgc, password } : UserProps) {
    setLoading(true);
    api.post('/login',{
      cgc, password
    }).then(res => {
      AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(res.data.user));
      AsyncStorage.setItem(COLLECTION_TOKEN, JSON.stringify(res.data.token));
      setClientToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);
    }).catch(err => {

      const errorString = String(err);
      const res = errorString.replace(/\D/g,'');

      if(res === '403'){
        Alert.alert('Usuário não Cadastrado!');
        signOut();
        setLoading(false);
      }else if(res === '401'){
        Alert.alert('Sessão Terminada, Faça login novamente.');
        signOut();
        setLoading(false);
      }else if(res === '419'){
        Alert.alert('Senha Incorreta.');
        signOut();
        setLoading(false);
      }else{
        Alert.alert('Problema na Conexão.');
        signOut();
        setLoading(false);
      }
    });
  }

  async function signOut() {
    setUser({} as UserProps);
    await AsyncStorage.removeItem(COLLECTION_USER);
  }

  async function sendLog({logText, clientToken} : LogProps) {
    const storagedToken = await AsyncStorage.getItem(COLLECTION_DEVICE_TOKEN);
    if(storagedToken){
      await api.post('/evento',{
        userCode: user.userCode,
        eventDescription: logText,
        userToken: clientToken,
        deviceToken: JSON.parse(storagedToken)
      },{
        headers: {'Authorization': 'Bearer '+clientToken}
      }).catch(err => {

        const errorString = String(err);
        const error = errorString.replace(/\D/g,'');

        if(error === '401'){
          Alert.alert('Sessão Terminada, Faça login novamente.');
          signOut();
          setLoading(false);
        }else{
          Alert.alert('Erro de LOG');
        }
        
      }).then(() => {
        if(testParams)
          Alert.alert('LOG ENVIADO');
      })
    }
  }

  async function sendLoginLog(clientToken : string) {
    const storagedToken = await AsyncStorage.getItem(COLLECTION_DEVICE_TOKEN);
    if(storagedToken){
      await api.post('/evento',{
        userCode: user.userCode,
        eventDescription: `${user.userName} ENTROU NO SISTEMA`,
        userToken: clientToken,
        deviceToken: JSON.parse(storagedToken)
      },{
        headers: {'Authorization': 'Bearer '+clientToken}
      }).catch(() => {
        Alert.alert('Erro de LoginLOG');
      }).then(() => {
        Alert.alert('LOGIN LOG ENVIADO');
      })
      setIsSignInLogSended(true);
    }
  }

  async function handleSetNewCondition({id, condition}: ConditionProps) {
    await api.put(`/order/condition/${id}`,{
      condition: condition
    },{
      headers: { 'Authorization' : 'Bearer ' +clientToken }
    }).catch(err => {
      Alert.alert(`ERRO NO ENVIO DA CONDIÇÃO ${condition}, id: ${id}`, `${err}`)
    });
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      clientToken, 
      signIn, 
      signOut, 
      sendLog,
      sendLoginLog,
      handleSetNewCondition,
      loading,
      isSignInLogSended
    }}>
      { children }
    </AuthContext.Provider>
  );

}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth
}