import React, { createContext, useState, useContext, ReactNode } from "react";
import { Alert, Linking, Platform } from 'react-native';
import { api } from '../services/api';

import * as packageJson from '../../app.json';
import { itunesID } from "../../credentials";

const androidPackageName = packageJson.expo.android.package;
const itunesItemId = itunesID;

export interface UserProps {
  id?: number;
  isActive?: number;
  password: string;
  userCode?: string;
  userName?: string;
  cgc: string;
}

interface versionMobileProps extends UserProps {
  versionMobile: string;
  mobileUsed: number;
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
  orderReference?: string;
}

interface AuthContextData {
  signed: boolean;
  user: UserProps;
  changePassword: boolean;
  oldPassword: string;
  clientToken: string;
  loading: boolean;
  isSignInLogSended: boolean;
  signIn({cgc, password, versionMobile,mobileUsed} : versionMobileProps): Promise<void>;
  enterApp: () => Promise<void>;
  signOut: () => Promise<void>;
  sendLog({logText, clientToken} : LogProps): Promise<void>;
  sendLoginLog(clientToken : string): Promise<void>;
  handleSetNewCondition({id, condition, orderReference} : ConditionProps) : Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [clientToken, setClientToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignInLogSended, setIsSignInLogSended] = useState(false);
  
  async function signIn({ cgc, password, versionMobile, mobileUsed } : versionMobileProps) {
      setLoading(true);
      setOldPassword(password);
      api.post('/login',{
        cgc, password, versionMobile, mobileUsed
      }).then(res => {
        
        setClientToken(res.data.token);
        setUser(res.data.user);
        if(cgc === password) {
          setChangePassword(true);
        }
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
        }else if(res === '406'){
          Alert.alert('Usuário Inativo.');
          signOut();
          setLoading(false);
        }else if(res === '419'){
          Alert.alert('Senha Incorreta.');
          signOut();
          setLoading(false);
        }else if(res === '426' && Platform.OS === 'android'){
          Alert.alert(
            'Atenção', 
            'Sua versão está desatualizada, Por favor atualize o seu aplicativo.',
            [
              { text: "Atualizar", onPress: () => Linking.openURL(`market://details?id=${androidPackageName}`) },
              {
                text: "Não",
                onPress: () => {},
                style: "cancel"
              }
            ]
          );
          signOut();
          setLoading(false);
        }
        else if(res === '426' && Platform.OS === 'ios'){
          Alert.alert(
            'Atenção', 
            'Sua versão está desatualizada, Por favor atualize o seu aplicativo.',
            [
              { text: "Atualizar", onPress: () => Linking.openURL(
                `https://beta.itunes.apple.com/v1/app/${itunesItemId}`
                ) 
              },
              {
                text: "Não",
                onPress: () => {},
                style: "cancel"
              }
            ]
          );
          signOut();
          setLoading(false);
        }else{
          Alert.alert('Problema de Conexão');
          signOut();
          setLoading(false);
        }
      });
  }

  async function enterApp() {
    setChangePassword(false);
  }

  async function signOut() {
    setUser({} as UserProps);
  }

  async function sendLog({logText, clientToken} : LogProps) {
    if(clientToken){
      await api.post('/evento',{
        userCode: user.userCode,
        eventDescription: logText,
        userToken: clientToken,
        deviceToken: 'Not Safe'
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
          Alert.alert('Sua Conexão Está Instável!');
        }
      });
    }
  }

  async function sendLoginLog(clientToken : string) {
    if(clientToken){
      await api.post('/evento',{
        userCode: user.userCode,
        eventDescription: `${user.userName} ENTROU NO SISTEMA`,
        userToken: clientToken,
        deviceToken: 'Not Safe'
      },{
        headers: {'Authorization': 'Bearer '+clientToken}
      }).catch(() => {
        setIsSignInLogSended(true);
      }).then(() => {
        setIsSignInLogSended(true);
      });
    }
  }

  async function handleSetNewCondition({id, condition, orderReference}: ConditionProps) {
    if(orderReference != undefined){
      await api.put(`/order/condition/${id}`,{
        condition: condition,
        orderReference: orderReference,
      },{
        headers: { 'Authorization' : 'Bearer ' +clientToken }
      }).catch(err => {
        Alert.alert(`ERRO NO ENVIO DA CONDIÇÃO ${condition}, id: ${id}`, `${err}`)
      });
    }else{
      await api.put(`/order/condition/${id}`,{
        condition: condition,
      },{
        headers: { 'Authorization' : 'Bearer ' +clientToken }
      }).catch(err => {
        Alert.alert(`ERRO NO ENVIO DA CONDIÇÃO ${condition}, id: ${id}`, `${err}`)
      });
    }
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!user,
      user,
      changePassword,
      clientToken,
      oldPassword,
      signIn, 
      signOut,
      enterApp,
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