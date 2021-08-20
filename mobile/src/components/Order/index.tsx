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

    const getDay = dateProto.getDate();
    const dateDay = getDay < 10 ? '0' + getDay : '' + getDay;

    const getMonth = dateProto.getMonth()+1;
    const dateMonth = getMonth < 10 ? '0' + getMonth : '' + getMonth;
     
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
          data.condition === 217 &&
            {backgroundColor: theme.colors.unactivatedList},
          data.condition === 218 &&
            {backgroundColor: theme.colors.ContinueDesactivated},
          data.condition === 219 &&
            {backgroundColor: theme.colors.Continue},
          data.condition === 220 &&
            {backgroundColor: theme.colors.activatedList},
          data.condition === 221 &&
            {backgroundColor: theme.colors.Cancel},
          data.condition === 222 &&
            {backgroundColor: theme.colors.Cancel},
          data.condition >= 223 &&
            {backgroundColor: theme.colors.activatedList},
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
            <Text style={[styles.title,
              data.condition === 217 &&
                {color: theme.colors.activatedList},
              data.condition === 218 &&
                {color: theme.colors.title},
              data.condition == 219 &&
                {color: theme.colors.activatedList},
              data.condition === 220 &&
                {color: theme.colors.title},
              data.condition === 221 &&
                {color: theme.colors.secondary},
              data.condition === 222 &&
                {color: theme.colors.secondary},
              data.condition >= 223 &&
                {color: theme.colors.title},
            ]}>
              { client.clientName }
            </Text>
        }


        <CristaliInput 
          style={[styles.text,
            data.condition >= 221 &&
              {color: theme.colors.overlay},
            data.condition === 220 &&
              {color: theme.colors.Config}
          ]}
          textAlign='left'
          value={dateFormat}
          editable={false}
        />

        <TextInputMask
          style={[styles.text,
            data.condition >= 221 &&
              {color: theme.colors.overlay},
            data.condition === 220 &&
              {color: theme.colors.Config}
          ]}
          type={'money'}
          textAlign='left'
          value={data.totalPrice.toString()}
          editable={false}
        />
      </View>
    </View>

    <View>
      {data.condition === 217 && <Text style={[styles.condition,{color: theme.colors.activatedList}]}>Iniciada</Text>}
      {data.condition === 218 && <Text style={[styles.condition,{color: theme.colors.title}]}>Dados Inseridos</Text>}
      {data.condition === 219 && <Text style={[styles.condition,{color: theme.colors.activatedList}]}>Pgto Selec.</Text>}
      {data.condition === 220 && <Text style={[styles.condition,{color: theme.colors.title}]}>Pago CC</Text>}
      {data.condition === 221 && <Text style={[styles.condition,{color: theme.colors.overlay}]}>Recusada</Text>}
      {data.condition === 222 && <Text style={[styles.condition,{color: theme.colors.input}]}>Cancelada</Text>}
      {data.condition === 223 && <Text style={[styles.condition,{color: theme.colors.title}]}>Dinheiro</Text>}
      {data.condition === 224 && <Text style={[styles.condition,{color: theme.colors.title}]}>Outro Método</Text>}
      <Text 
        style={[styles.number,
            data.condition >= 221 &&
              {color: theme.colors.overlay},
            data.condition === 220 &&
              {color: theme.colors.Config}
          ]}
      >Número
      </Text>
      <Text
        style={[styles.text,
          data.condition >= 221 &&
            {color: theme.colors.overlay},
          data.condition === 220 &&
            {color: theme.colors.Config}
          ]}
      >
        #{ data.id }
      </Text>
    </View>
    

  </TouchableOpacity>
  );
}