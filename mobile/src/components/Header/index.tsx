import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../global';

interface HeaderProps {
  title: string;
  haveBack?: boolean;
  handleBack?: () => void,
  haveClose?: boolean;
  handleClose?: () => void
}

export function Header({
  title,
  haveBack,
  haveClose
} : HeaderProps ){
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }

  function handleClose(){
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerRow}>
        <View style={[styles.headerCol, styles.headerBorder, {alignItems: 'flex-start'}]}>
          {
            haveBack?
            <TouchableWithoutFeedback
              onPress={handleBack}
            >
              <Ionicons name="arrow-back-outline" size={24} color={`${theme.colors.Config}`} />
            </TouchableWithoutFeedback>
            :
            <View style={styles.closeSpace} />
          }
        </View>
        <View style={[styles.headerCol, {alignItems: 'center'}]}>
          <Text style={styles.title}>{ title }</Text>
        </View>
        <View style={[styles.headerCol, styles.headerBorder, {alignItems: 'flex-end'}]}>
          {
            haveClose?
            <TouchableWithoutFeedback
              onPress={handleClose}
            >
              <AntDesign name="close" size={24} color={`${theme.colors.close}`} />
            </TouchableWithoutFeedback>
            :
            <View style={styles.closeSpace} />
          }
        </View>
      </View>
      
    </View>
  );
}