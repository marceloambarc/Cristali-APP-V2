import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../hooks/auth';

import { COLLECTION_USER } from '../../config/storage';

import { Background } from '../../components/Background';
import { Logo } from '../../components/Logo';
import { CristaliInput } from '../../components/CristaliInput';
import { CristaliButton } from '../../components/CristaliButton'; 
import { InputMask } from '../../components/InputMask';

import { UserProps } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

export function SignIn() {
  const { loading, signIn } = useAuth();
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [cgc, setCgc] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try{
      const cgcProto = cgc.replace(/\D/g, "");
      await signIn({cgc: cgcProto, password});
    }catch(err){
      Alert.alert(err);
    }
  }

  async function loadUserData() {
    const storageUser = await AsyncStorage.getItem(COLLECTION_USER);
    if(storageUser){
      setUser(JSON.parse(storageUser));

      setCgc(user.cgc);
      setPassword(user.password);
    }
  }

  useEffect(() => {
    loadUserData()
  },[]);

  if(Platform.OS === 'ios'){
    return (
      <KeyboardAvoidingView
        style={{flexGrow: 2}}
        keyboardVerticalOffset={0}
        contentContainerStyle={{backgroundColor: 'transparent'}}
        behavior={'padding' }
      >
        <ScrollView 
          bounces= {false}
          style={{flex: 1}}
        >
          <Background>
            <View style={styles.container}>
          
              <StatusBar
                backgroundColor={theme.colors.input}
                translucent={true}
              />
          
              <Logo 
                subtext
              />
          
              {
                loading? <ActivityIndicator style={{marginTop: 100}} size='large' color={`${theme.colors.primary}`} />
                :
                <>
                  <View style={styles.credentials}>
                    <View style={styles.credentialsRow}>
                      <Text style={styles.cristaliInputText}>USUÁRIO</Text>
                      <InputMask
                        type={'cpf'}
                        textAlign='center'
                        value={cgc}
                        peachpuff
                        onChangeText={setCgc}
                      />
                    </View>
                    <View style={styles.credentialsRow}>
                      <Text style={styles.cristaliInputText}>SENHA</Text>
                      <CristaliInput 
                        textAlign='center'
                        peachpuff
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                      />
                    </View>
                  </View>
            
                  <View style={styles.buttonContainer}>
                    <CristaliButton
                      color={`${theme.colors.Success}`}
                      title='Entrar'
                      onPress={handleSignIn}
                    />
                  </View>
                </>
              }
          
            </View>
          </Background>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }else{
    return (
      <Background>
        <View style={styles.container}>
      
          <StatusBar
            backgroundColor={theme.colors.input}
            translucent={true}
          />
      
          <Logo 
            subtext
          />
      
          {
            loading? <ActivityIndicator style={{marginTop: 100}} size='large' color={`${theme.colors.primary}`} />
            :
            <>
              <View style={styles.credentials}>
                <View style={styles.credentialsRow}>
                  <Text style={styles.cristaliInputText}>USUÁRIO</Text>
                  <CristaliInput 
                    textAlign='center'
                    value={cgc}
                    peachpuff
                    onChangeText={setCgc}
                  />
                </View>
                <View style={styles.credentialsRow}>
                  <Text style={styles.cristaliInputText}>SENHA</Text>
                  <CristaliInput 
                    textAlign='center'
                    peachpuff
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                  />
                </View>
              </View>
        
              <View style={styles.buttonContainer}>
                <CristaliButton
                  color={`${theme.colors.Success}`}
                  title='Entrar'
                  onPress={handleSignIn}
                />
              </View>
            </>
          }
      
        </View>
      </Background>
    );
  }

}