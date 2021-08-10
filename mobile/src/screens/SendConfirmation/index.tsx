import React, { useState, useEffect } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { styles } from './styles';
import { theme } from '../../global';

import { PagSeguroConfirmationProps } from '../Confirmation';
import { ClientProps } from '../../components/ClientComponent';

interface ValueProps {
  value: string;
}

export function SendConfirmation() {
  const [value, setValue] = useState('');
  const [pagSeguroId, setPagSeguroId] = useState('');
  const [pagSeguroReference, setPagSeguroReference] = useState('');
  const [pagSeguroCardNumber, setPagSeguroCardNumber] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const pagSeguroParams = route.params as PagSeguroConfirmationProps;
  const clientParams = route.params as ClientProps;

  const valueParams = route.params as ValueProps;

  useEffect(() => {
    if(pagSeguroParams){
      setPagSeguroId(pagSeguroParams.id);
      setPagSeguroReference(pagSeguroParams.reference);
      setPagSeguroCardNumber(`XXXX-XXXX-XXXX-${pagSeguroParams.cardNumber}`);
    }

    if(clientParams) {
      setClientName(clientParams.clientName);
      setClientPhone(clientParams.clientPhone);
      setClientEmail(clientParams.clientEmail);
    }

    if(valueParams) {
      setValue(valueParams.value);
    }
  },[pagSeguroParams, clientParams, valueParams]);

  function handleSendEmail() {
    Linking.openURL(`mailto:${ clientEmail }?subject=Compra Cristali&body=
    Referência: ${ pagSeguroReference };
    Preço Total: R$ ${ value };
    Cartão de Crédito: ${ pagSeguroCardNumber };
    `);
    navigation.setParams({orderParams: null});
    navigation.navigate('Final');
  }

  function handleSendWhatsapp() {
    var sampleNumber = parseInt(value);
    const res = (sampleNumber / 100).toFixed(2);
    const replaced = res.replace('.',',');
    const toCurrency = 'R$ ' + replaced;
    
    // MANIPULAR NÚMERO
    Linking.openURL(`https://api.whatsapp.com/send?phone=5551992381616&text=%F0%9F%92%8E%20Ol%C3%A1!%20Comprovante%20Cristali%20%F0%9F%92%8E%0ARefer%C3%AAncia%20PagSeguro%3A%0A%20${ pagSeguroReference }%0A%0APre%C3%A7o%20Total%20da%20Compra%3A%20%0A${ toCurrency }%0A%0ADados%20do%20Cart%C3%A3o%3A%20%0A${ pagSeguroCardNumber }`);
    navigation.setParams({orderParams: null});
    navigation.navigate('Final');
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/pagseguro.png')}
            style={styles.pagseguroImage}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.text}>Selecione uma Opção {"\n"} para Envio de Comprovante.</Text>
        <View />

          <View style={styles.buttons}>
              <RectButton
                style={[styles.button, {backgroundColor: theme.colors.Continue}]}
                onPress={handleSendEmail}
              >
                <MaterialCommunityIcons
                  name="email-send"
                  size={32}
                  color="white"
                />
              </RectButton>
              <View style={styles.spaceButtons} />
              <RectButton
                style={[styles.button, {backgroundColor: theme.colors.Continue}]}
                onPress={handleSendWhatsapp}
              >
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={32}
                  color="white"
                />
              </RectButton>
          </View>


      </View>
    </View>
  )
}