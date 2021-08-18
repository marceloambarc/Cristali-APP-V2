import React from 'react';
import { Modal, ModalProps, TouchableWithoutFeedback, View, Text } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global';
import { UserProps } from '../../hooks/auth';

interface Props extends ModalProps {
  installments: number;
  user: UserProps;
  closeModal: () => void;
}

export function InstallmentModal({ closeModal, user, installments, ...rest } : Props) {
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      { ...rest }
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={[styles.title, {color: theme.colors.input}]}>Olá {user.userName}</Text>
            <Text style={[styles.title, {color: theme.colors.input}]}>Selecione o Parcelamento:</Text>
            <View style={styles.firstColor}>
              <Text style={[styles.title, {color: theme.colors.title}]}>Numero de parcelas {installments}</Text>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

