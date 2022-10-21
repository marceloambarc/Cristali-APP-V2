import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Logo } from '../../components/Logo';
import { CristaliButton } from '../../components/CristaliButton';

import { styles } from './styles';
import { theme } from '../../global';

export function Final(){
  const navigation = useNavigation();

  function handleBeggining(){
    navigation.navigate('Home',{
      userCode: '',
      totalPrice: '',
      orderNotes: '',
      orderReference: '',
      client: {
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientNotes: '',
        userCode: ''
      },
      itens: []
    });
  }

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.banner}>
        <Text style={styles.title}>Venda Concluída</Text>
      </View>

      <View style={styles.footer}>
        <CristaliButton 
          color={`${theme.colors.Success}`} 
          title="Início"
          onPress={handleBeggining}
        />
      </View>
       
    </View>
  );
}