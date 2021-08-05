import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import { theme } from "../../global";
import { api } from "../../services/api";

import { ClientProps } from "../ClientComponent";


export interface OrderProps {
  open?: boolean;
  id: number;
  userCode: number;
  createdAt: string;
  totalPrice: string;
  orderNotes: string;
  condition: number;
  clientCode: number;
  itens?:[{id: number, nm_produto: string, cd_codigogerado: string, vl_preco: number}];
  qt?: string;
}

interface OrderComponentProps extends TouchableOpacityProps {
  data: OrderProps;
}

export function Order({ data, ...rest } : OrderComponentProps ) {
  const { clientToken } = useAuth();
  const [client, setClient] = useState<ClientProps>({} as ClientProps);
  
  useEffect(() => {
    api.get(`/client/${data.clientCode}`,{
      headers: { 'Authorization' : 'Bearer ' +clientToken }
    }).then(res => {
      setClient(res.data);
    })
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
        <Text style={styles.title}>
          { client.clientName }
        </Text>

        <TextInputMask 
          style={styles.text}
          type={'datetime'}
          textAlign='left'
          value={data.createdAt}
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