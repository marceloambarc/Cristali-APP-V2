import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, Dimensions, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useAuth } from '../../hooks/auth';
import { Placeholder, PlaceholderLine, ShineOverlay } from 'rn-placeholder';

import { styles } from "./styles";
import { theme } from "../../global";

import { InputMask } from "../../components/InputMask";
import { CristaliInput } from "../../components/CristaliInput";
import { OrderList } from "../../components/OrderList";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { CristaliButton } from "../../components/CristaliButton";
import { HistoryModal } from "../../components/HistoryModal";
import { OrderModal } from "../../components/OrderModal";

import { OrderProps } from "../../components/Order";

import { api } from "../../services/api";

export function History() {
  const { user, clientToken, sendLog } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [orderHistory, setOrderHistory] = useState<OrderProps[]>([]);

  const [order, setOrder] = useState<OrderProps>({
    open: false,
    id: 0,
    userCode: 0,
    totalPrice: '0',
    createdAt: new Date(),
    orderNotes: '0',
    condition: 0,
    clientCode: 0} as OrderProps);

  const [historyCount, setHistoryCount] = useState(0);
  const [total, setTotal] = useState('0');

  const [momentum, setMomentum] =  useState<Date>(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSecondDatePickerVisible, setSecondDatePickerVisibility] = useState(false);

  const [firstDate, setFirstDate] = useState<Date>(momentum);
  const [secondDate, setSecondDate] = useState<Date>(new Date());

  const [activePressed, setActivePressed] = useState(false);
  const [inactivePressed, setInactivePressed] = useState(false);

  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  const logText = `${user.userName} Consultou Histórico de ${firstDate} até ${secondDate}`;

  const navigation = useNavigation();

  async function handleGetHistory(historyParam: string) {
    await api.get(`/myOrders/history/${historyParam}/${user.userCode}`,{
      headers: {'Authorization': 'Bearer '+clientToken}
    }).then(res => {
      setOrderHistory(res.data);
      setHistoryCount(res.data.length);
      setLoading(false);
    }).catch(err => {
      Alert.alert('Ops!',`Erro ao Carregar o seu Histórico.`);
      navigation.navigate('Home');
    });
  }

  async function handleSetMomentum() {
    var event = new Date();
    event.setDate(-30);
    setMomentum(event);
    setFirstDate(event);
  }

  async function handleReduce() {
    if(orderHistory.length === 0) {
      const reducedTotal = '0';
      return reducedTotal;
    } else {
      let reducedTotal = orderHistory.reduce((a,v) => a = a + parseFloat(v.totalPrice) , 0);

      orderHistory.map(order => {
        if(order.condition === 221 || order.condition === 222) {
          reducedTotal = reducedTotal - parseFloat(order.totalPrice);
        } else {
          return;
        }
      });
      return reducedTotal.toString();
    }
  }

  async function handleHistory() {
    await handleGetHistory('all');
    await handleSetMomentum();
  }

  useEffect(() => {
    handleHistory();
  },[]);

  useEffect(() => {
    handleReduce().then(res => {
      setLoadingPrice(false);
      if(res.length === 0)
        return;
      setTotal(res);
    });
  },[orderHistory]);

  function closeHistoryModal() {
    setOpenHistoryModal(false);
  }

  function handleOrderSelect(orderSelect: OrderProps) {
    setOrder(orderSelect);
    setOpenHistoryModal(true);
    //setOrderSelected(orderSelect);

    /*var sampleNumber = parseInt(orderSelect.totalPrice);
    const res = (sampleNumber / 100).toFixed(2);
    const replaced = res.replace('.',',');
    const toCurrency = 'R$ ' + replaced;

    Alert.alert(`Venda ${orderSelect.id}`, `Total da Venda: ${toCurrency}
    ${orderSelect.orderNotes}`);*/
  }

  const showSecondDatePicker = () => {
    setSecondDatePickerVisibility(true);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideSecondDatePicker = () => {
    setSecondDatePickerVisibility(false);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setFirstDate(date);
    hideDatePicker();
  };

  const handleSecondConfirm = (date: Date) => {
    setSecondDate(date);
    hideSecondDatePicker();
    sendLog({logText, clientToken});
  }

  async function handleActivePressed(){
    setLoading(true);
    setActivePressed(true);
    setInactivePressed(false);
    setOrderHistory([]);

    handleGetHistory('paid');
  }

  async function handleInactivePressed(){
    setLoading(true);
    setActivePressed(false);
    setInactivePressed(true);
    setOrderHistory([]);

    handleGetHistory('notPaid');
  }

  if(loading){
    return(
      <Loading />
    );
  } else {
    return (
      <>
        <StatusBar
          barStyle='dark-content'
          backgroundColor={theme.colors.input}
        />
        <Header
          historyHelper={true}
          title='Histórico'
          haveClose
        />
        <View style={styles.container}>
          <View style={styles.historyArea}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              display={Platform.OS === 'android'? 'default':'inline'}
              maximumDate={new Date()}
              date={momentum}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              is24Hour={true}
              headerTextIOS='Selecione a Data'
              confirmTextIOS='Confirmar'
              cancelTextIOS='Cancelar'
              textColor={'white'}
              isDarkModeEnabled={false}
              locale='pt_BR'
            />
            <DateTimePickerModal
              isVisible={isSecondDatePickerVisible}
              mode="date"
              display={Platform.OS === 'android'? 'default':'inline'}
              maximumDate={new Date()}
              date={new Date()}
              onConfirm={handleSecondConfirm}
              onCancel={hideSecondDatePicker}
              is24Hour={true}
              headerTextIOS='Selecione a Data'
              confirmTextIOS='Confirmar'
              cancelTextIOS='Cancelar'
              textColor={'white'}
              isDarkModeEnabled={false}
              locale='pt_BR'
            />

              <View style={styles.titleContainer}>
                <Text style={styles.title}>Filtro</Text>
                <View style={styles.datePicker}>
                  <View style={styles.datePickerRow}>
                    <TouchableOpacity 
                      style={styles.calendar}
                      onPress={showDatePicker}
                    >
                      <FontAwesome5 name="calendar-alt" size={Dimensions.get('window').height * .04} color="black" />
                    </TouchableOpacity>
                    <View style={styles.datepickedContainer}>
                      <Text style={styles.datepickedTitle}>Data Inicial</Text>
                      <Text style={styles.datepicked}>
                        { `${firstDate.getDate()}/${firstDate.getMonth()+1}/${firstDate.getFullYear()}` }
                      </Text>
                    </View>
                  </View>
                  <View style={styles.datePickerRow}>
                    <TouchableOpacity 
                      style={styles.calendar}
                      onPress={showSecondDatePicker}
                    >
                      <FontAwesome5 name="calendar-alt" size={Dimensions.get('window').height * .04} color="black" />
                    </TouchableOpacity>
                    <View style={styles.datepickedContainer}>
                      <Text style={styles.datepickedTitle}>Data Final</Text>
                      <Text style={styles.datepicked}>
                        { `${secondDate.getDate()}/${secondDate.getMonth()+1}/${secondDate.getFullYear()}` }
                      </Text>
                    </View>
                  </View>
                </View>

              <View style={{flexDirection: 'row'}}>

                <View style={styles.buttonColumn}>
                  <CristaliButton
                    title='✓'
                    color={`${theme.colors.Success}`}
                    onPress={handleActivePressed}
                    switchPressed={activePressed}
                  />
                </View>
                <View style={styles.buttonColumn}>
                  <CristaliButton
                    title='x'
                    color={`${theme.colors.Cancel}`}
                    onPress={handleInactivePressed}
                    switchPressed={inactivePressed}
                  />
                </View>
              </View>

            </View>
  
            <View style={styles.orderRow}>
              <View style={styles.orderCol}>
                <Text style={styles.orderText}>Pedidos</Text>
                <CristaliInput
                  value={historyCount.toString()}
                  editable={false}
                  textAlign='center'
                />
              </View>
              <View style={styles.orderCol}>
                <Text style={styles.orderText}>Total</Text>
                {
                  loadingPrice?
                  <Placeholder
                    Animation={ShineOverlay}
                  >
                    <PlaceholderLine width={30} />
                  </Placeholder>
                  :
                  <InputMask
                  type={"money"}
                  value={total}
                  editable={false}
                  textAlign='center'
                  />
                }
              </View>
            </View>
  
            <View style={styles.list}>
              <OrderList
                isEmpty={loading}
                data={orderHistory}
                handleOrderSelect={handleOrderSelect}
              />
            </View>
  
          </View>

          <HistoryModal
            visible={openHistoryModal}
            closeModal={closeHistoryModal}
          >
            <OrderModal
              data={order}
            />
          </HistoryModal>
        </View>
      </>
    );
  }
}