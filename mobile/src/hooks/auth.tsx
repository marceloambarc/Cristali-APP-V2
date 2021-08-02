import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLLECTION_USER, COLLECTION_TOKEN } from "../config/storage";
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

interface AuthContextData {
  signed: boolean;
  user: UserProps;
  clientToken: string;
  loading: boolean;
  signIn({cgc, password} : UserProps): Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [clientToken, setClientToken] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn({ cgc, password } : UserProps) {
    setLoading(true);
    api.post('/login',{
      cgc, password
    }).then(res => {
      AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(res.data.user));
      setClientToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);
    }).catch(err => {

      const errorString = String(err);
      const res = errorString.replace(/\D/g,'');

      if(res === '403'){
        Alert.alert('Usuário não Cadastrado!');
        setLoading(false);
      }else if(res === '401'){
        Alert.alert('Sessão Terminada, Faça login novamente.');
      }else if(res === '419'){
        Alert.alert('Senha Incorreta.');
      }else{
        Alert.alert('Problema na Conexão.');
      }

    });
  }

  async function signOut() {
    setUser({} as UserProps);
    await AsyncStorage.removeItem(COLLECTION_USER);
  }

  async function loadStoragedData() {
    const storagedUser = await AsyncStorage.getItem(COLLECTION_USER);
    if(storagedUser) {
      //const userLogged = JSON.parse(storagedUser) as UserProps;
    }
  }

  useEffect(() => {
    loadStoragedData();
  },[]);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, clientToken, signIn, signOut, loading }}>
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