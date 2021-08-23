import React from 'react';
import { ReactNode } from 'react';
import { View, Modal, ModalProps, TouchableWithoutFeedback, Text } from 'react-native';

import { styles } from './styles';

interface Props extends ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

export function HistoryModal({ children, closeModal, ...rest } : Props){
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      { ...rest }
    >
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.bar} />
          { children }
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}