import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacityProps } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useAuth } from "../../hooks/auth";

import { styles } from "./styles";
import { theme } from "../../global";
import { api } from "../../services/api";

import { ClientProps } from "../ClientComponent";
import { OrderProps } from "../Order";
import { CristaliInput } from "../CristaliInput";
import { Loading } from "../Loading";

interface OrderComponentProps extends TouchableOpacityProps {
  data: OrderProps;
}

export function OrderModal({ data } : OrderComponentProps ) {
  const [loading, setLoading] = useState(true)
  const { clientToken } = useAuth();
  const [client, setClient] = useState<ClientProps>({} as ClientProps);
  const [dateFormat, setDateFormat] = useState('');

  function handleFormat() {
    const dateProto = new Date(data.createdAt);

    const getDay = dateProto.getDate();
    const dateDay = getDay < 10 ? '0' + getDay : '' + getDay;

    const getMonth = dateProto.getMonth()+1;
    const dateMonth = getMonth < 10 ? '0' + getMonth : '' + getMonth;
     
    const dateYear = dateProto.getFullYear();

    const dateHour = dateProto.getHours();
    const dateMinutes = (dateProto.getMinutes()<10?'0':'') + dateProto.getMinutes();


    setDateFormat(`${dateDay}/${dateMonth}/${dateYear} - ${dateHour}:${dateMinutes}`);
  }
  
  useEffect(() => {
    api.get(`/client/${data.clientCode}`,{
      headers: { 'Authorization' : 'Bearer ' +clientToken }
    }).then(res => {
      setClient(res.data);
      setLoading(false);
    });

    handleFormat();
  },[]);

  return (
    <ScrollView>
    <View style={styles.content}>
    <View style={{paddingHorizontal: 70, marginTop: 10}}>
      <Text style={styles.number}>Venda #{ data.id }</Text>
    </View>
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
          style={[styles.text,{color: theme.colors.Config}]}
          textAlign='center'
          value={dateFormat}
          editable={false}
        />

        <TextInputMask
          style={[styles.title,{paddingTop: 20}]}
          type={'money'}
          textAlign='left'
          value={data.totalPrice.toString()}
          editable={false}
        />

        {data.condition === 220 && <Text style={[styles.text,{color: theme.colors.Success}]}>Cartão de Crédito</Text>}
        {data.condition === 221 && <Text style={[styles.text,{color: theme.colors.Cancel}]}>Recusada</Text>}
        {data.condition === 222 && <Text style={[styles.text,{color: theme.colors.Cancel}]}>Cancelada</Text>}
        {data.condition === 223 && <Text style={[styles.text,{color: theme.colors.Success}]}>Dinheiro</Text>}
        {data.condition === 224 && <Text style={[styles.text,{color: theme.colors.Success}]}>Outra Forma</Text>}
        <Text style={[styles.text,{color: theme.colors.primary}]}>{ data.orderNotes }</Text>
      </View>
    </View>

    <View style={styles.bar} />
    <View style={styles.itensTitle}>
      <Text style={styles.title}>Itens:</Text>
    </View>
    <View>
      {data.itens !== undefined
        ?
        data.itens.map(item => {
          return(
            <View style={styles.itemContainer} key={item.cd_codigogerado}>
              <Text style={styles.itemtext}>Produto: {item.nm_produto}</Text>
              <TextInputMask
                style={[styles.text,{color: theme.colors.primary}]}
                type={'money'}
                textAlign='left'
                value={(parseInt(item.vl_preco)).toString()}
                editable={false}
              />
            </View>
          );
        })
        :
        <Text>Nenhum item cadastrado</Text>
      }
    </View>
    {data.orderReference !== '' 
      ? 
      <View style={{marginTop: 10}}>
        <Text style={styles.number}>Referência</Text>
        <Text style={styles.reference}>{ data.orderReference }</Text>
      </View>
      : 
      <></>
    }


  </ScrollView>
  );
}