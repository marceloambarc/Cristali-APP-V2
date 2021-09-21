import React, { useState, useEffect } from 'react';
import { View, Linking, Text, Alert } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import { CristaliButton } from '../components/CristaliButton';
import { InputMask } from '../components/InputMask';

import { styles } from './styles.test';
import { theme } from '../global';

export function Test(){
  const [value, setValue] = useState(0);

  const [format, setFormat] = useState('');

  async function handleSettings(){
    var sampleNumber = value;
    const res = (sampleNumber / 100).toFixed(2);
    const alteredState = res.replace('.',',');
    console.log(alteredState);
  
    /*const pagSeguroReference = 'TESTEREFERENCIA';
    const value = 'TESTEVALOR';
    const pagSeguroCardNumber = 'TESTE CARTÃO';
  
    Linking.openURL(`https://api.whatsapp.com/send?phone=5551992381616&text=%F0%9F%92%8E%20Ol%C3%A1!%20Comprovante%20Cristali%20%F0%9F%92%8E%0ARefer%C3%AAncia%20PagSeguro%3A%0A%20${ pagSeguroReference }%0A%0APre%C3%A7o%20Total%20da%20Compra%3A%20%0A${ value }%0A%0ADados%20do%20Cart%C3%A3o%3A%20%0A${ pagSeguroCardNumber }`);
    */
  }

  useEffect(() => {
    setValue(12000);
  },[]);

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <CristaliButton 
        title="Botão Teste"
        color={`${theme.colors.Continue}`}
        onPress={handleSettings}
      />
      <InputMask
        type={'money'}
        value={value.toString()}
        textAlign='center'
      />
    </View>
  );
}