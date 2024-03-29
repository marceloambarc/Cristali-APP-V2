import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

interface HeaderProps {
  title: string;
  haveBack?: boolean;
  helper?: boolean;
  historyHelper?: boolean;
  handleBack?: () => void,
  haveClose?: boolean;
  handleClose?: () => void
}

export function Header({
  title,
  haveBack,
  helper = false,
  historyHelper = false,
  haveClose
} : HeaderProps ){
  const { user } = useAuth();
  const navigation = useNavigation();

  const [openHelperModal, setOpenHelperModal] = useState(false);
  const [openHistoryHelperModal, setOpenHistoryHelperModal] = useState(false);

  function openModal() {
    setOpenHelperModal(true);
  }

  function closeModal() {
    setOpenHelperModal(false);
  }

  function openHistoryModal() {
    setOpenHistoryHelperModal(true);
  }

  function closeHistoryModal() {
    setOpenHistoryHelperModal(false);
  }

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
            haveBack &&
            <TouchableWithoutFeedback
              onPress={handleBack}
            >
              <Ionicons name="arrow-back-outline" size={24} color={`${theme.colors.Config}`} />
            </TouchableWithoutFeedback>
          }

          {
            helper &&
            <TouchableWithoutFeedback
              onPress={openModal}
            >
              <Ionicons name="help" size={24} color={`${theme.colors.Config}`} />
            </TouchableWithoutFeedback>
          }

          {
            historyHelper &&
            <TouchableWithoutFeedback
              onPress={openHistoryModal}
            >
              <Ionicons name="help" size={24} color={`${theme.colors.Config}`} />
            </TouchableWithoutFeedback>
          }
          <View style={styles.closeSpace} />
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
      
      <Modal
        transparent
        animationType="slide"
        statusBarTranslucent
        visible={openHelperModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={[styles.title, {color: theme.colors.input}]}>Olá {user.userName}</Text>
              <Text style={[styles.title, {color: theme.colors.input}]}>Informações de Cores:</Text>
              <View style={styles.firstColor}>
                <Text style={[styles.title, {color: theme.colors.title}]}>Venda Iniciada</Text>
              </View>
              <View style={styles.secondColor}>
                <Text style={[styles.title, {color: theme.colors.title}]}>Dados Inseridos</Text>
              </View>
              <View style={styles.thirdColor}>
                <Text style={[styles.title, {color: theme.colors.activatedList}]}>Pagamento Selecionado</Text>
              </View>
              <View>
                <Text></Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent
        animationType="slide"
        statusBarTranslucent
        visible={openHistoryHelperModal}
      >
        <TouchableWithoutFeedback onPress={closeHistoryModal}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={[styles.title, {color: theme.colors.input}]}>Olá {user.userName}</Text>
              <Text style={[styles.title, {color: theme.colors.input, marginBottom: 70}]}>Informações de Cores:</Text>
              <View style={styles.fouthColor}>
                <Text style={[styles.title, {color: theme.colors.overlay}]}>Venda Rejeitada</Text>
              </View>
              <View style={styles.fouthColor}>
                <Text style={[styles.title, {color: theme.colors.secondary}]}>Venda Cancelada</Text>
              </View>
              <View style={styles.fifthColor}>
                <Text style={[styles.title, {color: theme.colors.Config}]}>Venda Paga</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
}