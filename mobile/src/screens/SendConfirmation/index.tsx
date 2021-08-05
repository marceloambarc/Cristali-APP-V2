import React, { useState, useEffect } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { styles } from './styles';
import { theme } from '../../global';

import { pgapi } from '../../services/pgapi';

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
      setPagSeguroReference(pagSeguroParams.refence);
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
    Referencia: ${ pagSeguroReference };
    Preço Total: R$ ${ value };
    Cartão de Crédito: ${ pagSeguroCardNumber };
    `);
  }

  function handleSendWhatsapp() {
    // let companyPhoneSplit = companyPhone.split('(51) 9').join('5551');
    // let companyWhatsapp = companyPhoneSplit.split('-').join('');

    alert('Olá');
    //Linking.openURL(`https://api.whatsapp.com/send?phone=${clientPhone}&text=Mensagem%20vinda%20do%20Aplicativo%20CompreMaisAki%3A%0APromo%C3%A7%C3%A3o%3A%20${productName}%0APre%C3%A7o%20sem%20Desconto%3A%20${productPrice}%0AValidade%20da%20Promo%C3%A7%C3%A3o%3A%20${productValidade}%0ADesconto%3A%20${productDiscount}%25%0ACom%20essa%20mensagem%20pelo%20App%20CompreMaisAki%20ganhe%20desconto%20de%3A%20${productDiscount}%25%0A%0A`);
  }

        //navigation.setParams({orderParams: null});
      //navigation.navigate('Final');

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
        <Text>{pagSeguroId}</Text>
        <Text>{pagSeguroReference}</Text>
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