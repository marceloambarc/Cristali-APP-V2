import React from 'react';
import { Modal, ModalProps, TouchableWithoutFeedback, TouchableOpacity, View, Text, Platform, Dimensions } from 'react-native';
import currencyFormatter  from 'currency-formatter';
import { AntDesign } from '@expo/vector-icons';
import { UserProps } from '../../hooks/auth';

import { styles } from './styles';
import { theme } from '../../global';

import { twoInstallment, 
  threeInstallment, 
  fourInstallment, 
  fiveInstallment, 
  sixInstallment } from '../../config/options';

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
              <TouchableWithoutFeedback
                onPress={closeModal}
              >
                <AntDesign name="close" size={24} color={`${theme.colors.Cancel}`} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={[styles.title, {color: theme.colors.input, marginTop: Dimensions.get('screen').height * 0.012}]}>Selecione o Parcelamento:</Text>
            
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

            {
              Platform.OS === 'android'
              ?
              <View style={styles.installmentChoosed}>
                {installment === 1 && <Text style={[styles.title, {color: theme.colors.title}]}>À Vista {currencyFormatter.format(value / 100,{code:'BRL'})}</Text>}
                {installment === 2 && <Text style={[styles.title, {color: theme.colors.title}]}>2 X {currencyFormatter.format(value / 100 * twoInstallment,{code:'BRL'})}</Text>}
                {installment === 3 && <Text style={[styles.title, {color: theme.colors.title}]}>3 X {currencyFormatter.format(value / 100 * threeInstallment,{code:'BRL'})}</Text>}
                {installment === 4 && <Text style={[styles.title, {color: theme.colors.title}]}>4 X {currencyFormatter.format(value / 100 * fourInstallment,{code:'BRL'})}</Text>}
                {installment === 5 && <Text style={[styles.title, {color: theme.colors.title}]}>5 X {currencyFormatter.format(value / 100 * fiveInstallment,{code:'BRL'})}</Text>}
                {installment === 6 && <Text style={[styles.title, {color: theme.colors.title}]}>6 X {currencyFormatter.format(value / 100 * sixInstallment,{code:'BRL'})}</Text>}
              </View>
              :
              <View style={styles.installmentChoosed}>
              
                {installment === 1 && <Text style={[styles.title, {color: theme.colors.title}]}>À Vista {(value / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
                {installment === 2 && <Text style={[styles.title, {color: theme.colors.title}]}>2 X {(value /100 * twoInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
                {installment === 3 && <Text style={[styles.title, {color: theme.colors.title}]}>3 X {(value / 100 * threeInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
                {installment === 4 && <Text style={[styles.title, {color: theme.colors.title}]}>4 X {(value / 100 * fourInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
                {installment === 5 && <Text style={[styles.title, {color: theme.colors.title}]}>5 X {(value / 100 * fiveInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}
                {installment === 6 && <Text style={[styles.title, {color: theme.colors.title}]}>6 X {(value / 100 * sixInstallment).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>}

              </View>
            }



            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleInstallmentFinish}
              >
                  <AntDesign name="checkcircleo" size={24} color={`${theme.colors.input}`} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

