import React, { useState, useEffect } from 'react';
import { Text, View, Image, Linking, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import * as MailComposer from 'expo-mail-composer';

import { styles } from './styles';
import { theme } from '../../global';

import { ClientProps } from '../../components/ClientComponent';

interface PagSeguroConfirmationProps {
  pagSeguroId: string;
  reference_id: string;
  cardNumber: string;
}

interface ValueProps {
  value: string;
}

export function SendConfirmation() {
  const { user, clientToken, sendLog } = useAuth();
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
      setPagSeguroId(pagSeguroParams.pagSeguroId);
      setPagSeguroReference(pagSeguroParams.reference_id);
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
    var sampleNumber = parseInt(value);
    const res = (sampleNumber / 100).toFixed(2);
    const replaced = res.replace('.',',');
    const toCurrency = 'R$ ' + replaced;

    const message = `💎 Olá ${clientName}!
    Sua compra foi aprovada!
    Comprovante Cristali:

    Referência PagSeguro:
    💎 ${ pagSeguroReference }
    
    Preço Total da Compra: 
    💎 ${ toCurrency }
    
    Dados do Cartão: 
    💎 ${ pagSeguroCardNumber }
    
    Qualquer duvida entre em contato com sua vendedora! `

    MailComposer.composeAsync({
      subject: `Comprovante Cristali`,
      recipients: [`${clientEmail}`],
      body: message
    }).then(() => {
      sendLog({logText:`${user.userName} ENVIOU COMROVANTE DA REFERÊNCIA Nº ${pagSeguroReference} PARA O EMAIL: ${clientEmail} PREÇO DA COMPRA: ${toCurrency}, DADOS DO CARTÃO: ${ pagSeguroCardNumber }`, clientToken});
      navigation.setParams({orderParams: null});
      navigation.navigate('Final');
    });
  }

  function handleSendWhatsapp() {
    let clientPhoneWP = clientPhone.split('51').join('5551');

    var sampleNumber = parseInt(value);
    const res = (sampleNumber / 100).toFixed(2);
        
    const replaced = res.replace('.','%2C');
    const toCurrency = 'R%24%20' + replaced;

    const replacedLog = res.replace('.',',');
    const toCurrencyLog = 'R$ ' + replacedLog;


    // MANIPULAR NÚMERO
    Linking.canOpenURL(`https://wa.me/${clientPhoneWP}?text=Ol%C3%A1%20${clientName}%20%0A%0ASua%20compra%20foi%20aprovada%0A%0A%20Comprovante%20Cristali%0A%0ARefer%C3%AAncia%20PagSeguro%20${pagSeguroReference}%0A%0APre%C3%A7o%20Total%20da%20Compra%3A%20${toCurrency}%0A%0ADados%20do%20Cart%C3%A3o%3A%20${pagSeguroCardNumber}%0A%0A%0A%0AQualquer%20d%C3%BAvida%20entre%20em%20contato%20com%20sua%20vendedora`).then(supported => {
      if(supported){
        if(Platform.OS == 'android'){
          Linking.openURL(`https://wa.me/${clientPhoneWP}?text=Ol%C3%A1%20${clientName}%20%0A%0ASua%20compra%20foi%20aprovada%0A%0A%20Comprovante%20Cristali%0A%0ARefer%C3%AAncia%20PagSeguro%20${pagSeguroReference}%0A%0APre%C3%A7o%20Total%20da%20Compra%3A%20${toCurrency}%0A%0ADados%20do%20Cart%C3%A3o%3A%20${pagSeguroCardNumber}%0A%0A%0A%0AQualquer%20d%C3%BAvida%20entre%20em%20contato%20com%20sua%20vendedora`);
        }else{
          Linking.openURL(`https://api.whatsapp.com/send/?phone=${clientPhoneWP}&text=Ola+${clientName}+Sua+compra+foi+aprovada++REF:+${pagSeguroReference}+Total:+R$${res}+CC:+${pagSeguroCardNumber}`)
        }
       
        sendLog({logText:`${user.userName} ENVIOU COMROVANTE DA VENDA Nº ${pagSeguroReference} POR WHATSAPP ${clientPhone}: PREÇO DA COMPRA ${toCurrencyLog}, DADOS DO CARTÃO: ${pagSeguroCardNumber}`, clientToken});
        navigation.setParams({orderParams: null});
        navigation.navigate('Final');
      }else{
        Alert.alert('Ops!', 'Comprovante não Enviado.');
        sendLog({logText:`${user.userName} NÃO PODE ENVIAR O COMROVANTE DE VENDA Nº ${pagSeguroReference} PARA WHATSAPP ${clientPhone}: PREÇO DA COMPRA ${toCurrencyLog}, DADOS DO CARTÃO: ${pagSeguroCardNumber}`, clientToken});
        navigation.setParams({orderParams: null});
        navigation.navigate('Final');
      }
    });
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
        { 
          clientEmail === ''
          ?
          <RectButton
            style={[styles.button, {backgroundColor: theme.colors.ContinueDesactivated}]}
            onPress={() => Alert.alert('Ops!', 'Email não Cadastrado.')}
          >
            <MaterialCommunityIcons
              name="email-send"
              size={32}
              color="white"
            />
          </RectButton>
          :
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
        }

          <View style={styles.spaceButtons} />
              
            { 
              clientPhone === ''
              ? 
              <RectButton
                style={[styles.button, {backgroundColor: theme.colors.ContinueDesactivated}]}
                onPress={() => Alert.alert('Ops!', 'Telefone não Cadastrado.')}
              >
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={32}
                  color="white"
                />
              </RectButton>
              :
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
            }
            
        </View>
      </View>
    </View>
  )
}