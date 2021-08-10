import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import { theme } from "../../global";
import { api } from "../../services/api";

import { ClientProps } from "../ClientComponent";
import { CristaliInput } from "../CristaliInput";
import { Loading } from "../Loading";


export interface OrderProps {
  open?: boolean;
  id: number;
  userCode: number;
  createdAt: Date;
  totalPrice: string;
  orderNotes: string;
  condition: number;
  clientCode: number;
  itens?:[{id: number, cd_codigogerado: string, vl_preco: string, nm_produto: string}];
  qt?: string;
}

interface OrderComponentProps extends TouchableOpacityProps {
  data: OrderProps;
}

export function Order({ data, ...rest } : OrderComponentProps ) {
  const [loading, setLoading] = useState(true)
  const { clientToken } = useAuth();
  const [client, setClient] = useState<ClientProps>({} as ClientProps);
  const [dateFormat, setDateFormat] = useState('');

  function handleFormatDate() {
    const dateProto = new Date(data.createdAt);

    const dateDay = dateProto.getDate();
    const dateMonth = dateProto.getMonth()+1;
    const dateYear = dateProto.getFullYear();

    const dateHour = dateProto.getHours();
    const dateMinutes = dateProto.getMinutes();


    setDateFormat(`${dateDay}/${dateMonth}/${dateYear} - ${dateHour}:${dateMinutes}`)
  }
  
  useEffect(() => {
    api.get(`/client/${data.clientCode}`,{
      headers: { 'Authorization' : 'Bearer ' +clientToken }
    }).then(res => {
      setClient(res.data);
      setLoading(false);
    });

    handleFormatDate()
  },[]);

  return (
    <TouchableOpacity
      style={
        [styles.container, 
          data.open ? 
          {backgroundColor: theme.colors.activatedList}
          :
          {backgroundColor: theme.colors.unactivatedList}
        ]}
      activeOpacity={0.7}
      {...rest}
    >
    <View />

    <View style={styles.content}>
      <View>
        {
          loading?
            <Loading />
          : 
            <Text style={styles.title}>
              { client.clientName }
            </Text>
        }


        <CristaliInput 
          style={styles.text}
          textAlign='left'
          value={dateFormat}
          editable={false}
        />

        <TextInputMask 
          style={styles.text}
          type={'money'}
          textAlign='left'
          value={data.totalPrice.toString()}
          editable={false}
        />
      </View>
    </View>

    <View>
      <Text style={styles.number}>Número</Text>
      <Text style={styles.text}>#{ data.id }</Text>
    </View>
    

  </TouchableOpacity>
  );
}