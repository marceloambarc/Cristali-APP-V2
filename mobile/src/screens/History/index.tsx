import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, Dimensions, Platform, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useAuth } from '../../hooks/auth';

import { styles } from "./styles";
import { theme } from "../../global";

import { COLLECTION_DEVICE_TOKEN } from "../../config/storage";

import { MoneyInput } from "../../components/MoneyInput";
import { CristaliInput } from "../../components/CristaliInput";
import { OrderList } from "../../components/OrderList";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";

import { OrderProps } from "../../components/Order";

import { api } from "../../services/api";

export function History() {
  const { user, clientToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState<OrderProps[]>([]);
  const [historyCount, setHistoryCount] = useState(0);
  const [total, setTotal] = useState('0');

  const [momentum, setMomentum] =  useState<Date>(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSecondDatePickerVisible, setSecondDatePickerVisibility] = useState(false);

  const [firstDate, setFirstDate] = useState<Date>(momentum);
  const [secondDate, setSecondDate] = useState<Date>(new Date());

  const [isLogSended, setIsLogSended] = useState(false);
  const [isHistoryDeleted, setIsHistoryDeleted] = useState(false);

  async function handleSetTotal(){
    setTotal(orderHistory.reduce((a,v) =>  a = a + parseFloat(v.ordem.totalPrice.replace('.','').replace(',','')) , 0).toString());
  }

  async function handleSetMomentum(){
    var event = new Date();
    event.setDate(-30);
    setMomentum(event);
    setFirstDate(event);
    setLoading(false);
  }

  async function getHistory(){
    api.get(`/order/${user.id}`).then(res => {
      setOrderHistory(res.data);
    })
  }

  async function handleLogSend(logText: string) {
    if(isLogSended)
      return;
    setLoading(true);
    api.post('/evento',{
      userCode: user.userCode,
      eventDescription: logText,
      userToken: clientToken,
      deviceToken: COLLECTION_DEVICE_TOKEN
    }).then(() => {
      setIsLogSended(true);
    }).catch(res => {
      setIsLogSended(false);
    })
  }

  async function deleteHistory() {
    if(isHistoryDeleted)
      return;
    api.delete(`/myOrders/history/${user.userCode}`).then(() => {
      setIsHistoryDeleted(true);
    }).catch(err => {
      Alert.alert(err);
    })
  }

  useEffect(() => {
    deleteHistory();
    getHistory();
    setHistoryCount(orderHistory.length);
    handleSetTotal();
    handleSetMomentum();
  },[]);

  function handleOrderSelect(orderSelect: OrderProps){
    alert('Selected ' + orderSelect.ordem.id);
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
    handleLogSend(`${user.userName} Consultou Histórico de ${firstDate} até ${secondDate}`);
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
          title='Histórico'
          haveClose
        />
        <View style={styles.container}>
          <View style={styles.historyArea}>
  
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Filtro</Text>
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
                  textColor={'black'}
                  isDarkModeEnabled={true}
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
                  textColor={'black'}
                  isDarkModeEnabled={true}
                  locale='pt_BR'
                />
              <TouchableOpacity 
                style={styles.calendar}
                onPress={showDatePicker}
              >
                <FontAwesome5 name="calendar-alt" size={Dimensions.get('window').height * .05} color="black" />
              </TouchableOpacity>
                <View style={styles.datepickedContainer}>
                  <Text style={styles.datepickedTitle}>Data Inicial</Text>
                  <Text style={styles.datepicked}>
                    { `${firstDate.getDate()}/${firstDate.getMonth()+1}/${firstDate.getFullYear()}` }
                  </Text>
                </View>
              <TouchableOpacity 
                style={styles.calendar}
                onPress={showSecondDatePicker}
              >
                <FontAwesome5 name="calendar-alt" size={Dimensions.get('window').height * .05} color="black" />
              </TouchableOpacity>
                <View style={styles.datepickedContainer}>
                  <Text style={styles.datepickedTitle}>Data Final</Text>
                  <Text style={styles.datepicked}>
                    { `${secondDate.getDate()}/${secondDate.getMonth()+1}/${secondDate.getFullYear()}` }
                  </Text>
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
                <MoneyInput
                  type={"money"}
                  value={total}
                  editable={false}
                  textAlign='center'
                />
              </View>
            </View>
  
            <View style={styles.list}>
              <OrderList
                data={orderHistory}
                handleOrderSelect={handleOrderSelect}
              />
            </View>
  
          </View>
        </View>
      </>
    );
  }
}