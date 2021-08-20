import React from 'react';
import { Modal, ModalProps, TouchableWithoutFeedback, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { UserProps } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

import { twoInstallment, 
  threeInstallment, 
  fourInstallment, 
  fiveInstallment, 
  sixInstallment } from '../../config/options';

import { CristaliButton } from '../CristaliButton'

interface Props extends ModalProps {
  user: UserProps;
  totalInstallments: number;
  installment: number;
  value: number;
  closeModal: () => void;
  handleInstallmentSelect: (installment: number) => void;
  handleInstallmentFinish: () => void;
}

export function InstallmentModal({ 
  closeModal, 
  handleInstallmentSelect, 
  handleInstallmentFinish, 
  totalInstallments, 
  installment,
  value,
  user, 
  ...rest } : Props) {


  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      { ...rest }
    >
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={[styles.title, {color: theme.colors.input}]}>Olá {user.userName}</Text>
              <TouchableWithoutFeedback
                onPress={closeModal}
              >
                <AntDesign name="close" size={24} color={`${theme.colors.Cancel}`} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={[styles.title, {color: theme.colors.input}]}>Selecione o Parcelamento:</Text>
            
            {totalInstallments >= 1 && 
              <TouchableOpacity
                onPress={() => handleInstallmentSelect(1)}
                { ...rest }
              >
                <View style={styles.firstColor}>
                  <Text style={[styles.title, {color: theme.colors.title}]}>À Vista</Text>
                </View>
                
              </TouchableOpacity>
            }

            {totalInstallments >= 2 &&
              <TouchableOpacity
                onPress={() => handleInstallmentSelect(2)}
                { ...rest }
              >
                <View style={styles.firstColor}>
                  <Text style={[styles.title, {color: theme.colors.title}]}>2 X</Text>
                </View>
              </TouchableOpacity>
            }

            {totalInstallments >= 3 &&
              <TouchableOpacity
                onPress={() => handleInstallmentSelect(3)}
                { ...rest }
              >
                <View style={styles.firstColor}>
                  <Text style={[styles.title, {color: theme.colors.title}]}>3 X</Text>
                </View>
              </TouchableOpacity>
            }

            {totalInstallments >= 4 &&
              <TouchableOpacity
                onPress={() => handleInstallmentSelect(4)}
                { ...rest }
              >
                <View style={styles.firstColor}>
                  <Text style={[styles.title, {color: theme.colors.title}]}>4 X</Text>
                </View>
              </TouchableOpacity>
            }

            {totalInstallments >= 5 &&
              <TouchableOpacity
                onPress={() => handleInstallmentSelect(5)}
                { ...rest }
              >
                <View style={styles.firstColor}>
                  <Text style={[styles.title, {color: theme.colors.title}]}>5 X</Text>
                </View>
              </TouchableOpacity>
            }

            {totalInstallments >= 6 &&
              <TouchableOpacity
                onPress={() => handleInstallmentSelect(6)}
                { ...rest }
              >
                <View style={styles.firstColor}>
                  <Text style={[styles.title, {color: theme.colors.title}]}>6 X</Text>
                </View>
              </TouchableOpacity>
            }

            <View style={styles.installmentChoosed}>
              {installment === 1 && <Text style={[styles.title, {color: theme.colors.title}]}>À Vista R$ {(value / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
              {installment === 2 && <Text style={[styles.title, {color: theme.colors.title}]}>2 X R$ {(value /100 * twoInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
              {installment === 3 && <Text style={[styles.title, {color: theme.colors.title}]}>3 X R$ {(value / 100 * threeInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
              {installment === 4 && <Text style={[styles.title, {color: theme.colors.title}]}>4 X R$ {(value / 100 * fourInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
              {installment === 5 && <Text style={[styles.title, {color: theme.colors.title}]}>5 X R$ {(value / 100 * fiveInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
              {installment === 6 && <Text style={[styles.title, {color: theme.colors.title}]}>6 X R$ {(value / 100 * sixInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
            </View>

            <View style={styles.footer}>
              <CristaliButton
                title="Continuar"
                color={`${theme.colors.Success}`}
                onPress={() => handleInstallmentFinish()}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

