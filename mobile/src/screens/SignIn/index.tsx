import React, { useState, } from 'react';
import { Text, View, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { Background } from '../../components/Background';
import { Logo } from '../../components/Logo';
import { CristaliInput } from '../../components/CristaliInput';
import { CristaliButton } from '../../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../../global';

export function SignIn() {
  const { loading, user, clientToken ,sendLog ,signIn } = useAuth();
  const [cgc, setCgc] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try{
      await signIn({cgc, password});

      const logText = `${user.userName} ENTROU NO SISTEMA`;
      await sendLog({logText, clientToken}).catch(err =>  {
        Alert.alert(
          'Erro',
          `${err}`
        )
      });
    }catch(err){
      Alert.alert(err);
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