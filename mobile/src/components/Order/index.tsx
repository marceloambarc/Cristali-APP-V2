import React from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";
import { theme } from "../../global";

export interface OrderProps {
  id: number;
  userCode: string;
  date: string;
  totalPrice: string;
  orderNotes: string;
  open?: boolean;
  condition: number;
}

interface Props extends TouchableOpacityProps {
  data: OrderProps;
}

export function Order({ data, ...rest } : Props ) {
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
          { data.userCode }
        </Text>

        <Text style={styles.text}>
          { data.date }
        </Text>

        <Text style={styles.text}>
          { data.totalPrice }
        </Text>
      </View>
    </View>

    <View>
      <Text style={styles.number}>Número</Text>
      <Text style={styles.text}>#{ data.id }</Text>
    </View>
    

  </TouchableOpacity>
  );
}