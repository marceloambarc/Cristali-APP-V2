import React, { useState } from 'react';
import { Text, View, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { versionCode } from '../../config/options';

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
  //const [user, setUser] = useState<UserProps>({} as UserProps);

  const [cgc, setCgc] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try{
      const cgcProto = cgc.replace(/\D/g, "");
      await signIn({cgc: cgcProto, password});
    }catch(err){
      return;
    }
  }

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
                versionCode={versionCode}
              />
          
              {
                loading? <ActivityIndicator style={{marginTop: 100}} size='large' color={`${theme.colors.primary}`} />
                :
                <>
                  <View style={styles.credentials}>
                    <View style={styles.credentialsRow}>
                      <Text style={styles.cristaliInputText}>USU??RIO</Text>
                      <InputMask
                        type={'cpf'}
                        keyboardType={'numeric'}
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
                        autoCapitalize={'none'}
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
            versionCode={versionCode}
          />
      
          {
            loading? <ActivityIndicator style={{marginTop: 100}} size='large' color={`${theme.colors.primary}`} />
            :
            <>
              <View style={styles.credentials}>
                <View style={styles.credentialsRow}>
                  <Text style={styles.cristaliInputText}>USU??RIO</Text>
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