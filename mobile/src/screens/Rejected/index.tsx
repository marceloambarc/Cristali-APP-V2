import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CristaliButton } from '../../components/CristaliButton';

import { ClientProps } from '../../components/ClientComponent';

import { styles } from './styles';
import { theme } from '../../global';

interface PagSeguroConfirmationProps {
  pagSeguroId: string;
  reference_id: string;
  cardNumber: string;
  response: string;
}

export function Rejected(){
  const navigation = useNavigation();
  const route = useRoute();

  const [pagSeguroId, setPagSeguroId] = useState('');
  const [pagSeguroReference, setPagSeguroReference] = useState('');
  const [pagSeguroCardNumber, setPagSeguroCardNumber] = useState('');
  const [pagSeguroResponse, setPagSeguroResponse] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const pagSeguroParams = route.params as PagSeguroConfirmationProps;
  const clientParams = route.params as ClientProps;

  useEffect(() => {
    if(pagSeguroParams){
      setPagSeguroId(pagSeguroParams.pagSeguroId);
      setPagSeguroResponse(pagSeguroParams.response);
      setPagSeguroReference(pagSeguroParams.reference_id);
      setPagSeguroCardNumber(`XXXX-XXXX-XXXX-${pagSeguroParams.cardNumber}`);
    }
    if(clientParams) {
      setClientPhone(clientParams.clientPhone);
    }
  },[pagSeguroParams]);

  function handleBeggining(){
    navigation.navigate('Home',{
      userCode: '',
      totalPrice: '',
      orderNotes: '',
      orderReference: '',
      client: {
        clientName: '',
        clientCgc: '',
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

        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../../assets/pagseguro.png')}
              style={styles.pagseguroImage}
              resizeMode='contain'
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Venda Rejeitada</Text>
            <Text style={styles.subtext}>{pagSeguroResponse}</Text>
            <Text style={styles.subtext}>{pagSeguroReference}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <CristaliButton 
            color={`${theme.colors.Config}`} 
            title="Início"
            onPress={handleBeggining}
          />
        </View>
       
      </View>
  );
}