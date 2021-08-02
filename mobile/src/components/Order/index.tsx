import React from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";
import { theme } from "../../global";
import { ClientProps } from "../ClientComponent";

export interface OrderProps {
  open?: boolean;
  ordem: {
    id: number;
    userCode: string;
    createdAt: string;
    totalPrice: string;
    orderNotes: string;
    condition: number;
    clientCode: number;
    itens?:[{id: number, productName: string, gCode: string, price: number}],
    qt?: string;
  },
  cliente: ClientProps;

}

interface OrderComponentProps extends TouchableOpacityProps {
  data: OrderProps;
}

export function Order({ data, ...rest } : OrderComponentProps ) {
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
          { data.ordem.userCode }
        </Text>

        <Text style={styles.text}>
          { data.ordem.createdAt }
        </Text>

        <Text style={styles.text}>
          { data.ordem.totalPrice }
        </Text>
      </View>
    </View>

    <View>
      <Text style={styles.number}>Número</Text>
      <Text style={styles.text}>#{ data.ordem.id }</Text>
    </View>
    

  </TouchableOpacity>
  );
}