import React from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

import { theme } from "../../global";

export interface ClientProps {
  id: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientNotes: string;
  userCode: string;
}

interface ClientComponentProps extends TouchableOpacityProps {
  data: ClientProps
}

export function ClientComponent({ data, ...rest } : ClientComponentProps) {
  return (
    <TouchableOpacity
      style={
        [styles.container, 
          {backgroundColor: theme.colors.activatedList}
        ]}
      activeOpacity={0.7}
      {...rest}
    >

    <View style={styles.content}>
      <View>
        <Text style={styles.title}>
          { data.clientName }
        </Text>

        <Text numberOfLines={1} style={styles.text}>
          { data.clientEmail }
        </Text>

        <Text numberOfLines={1} style={styles.text}>
          { data.clientNotes }
        </Text>
      </View>
    </View>

    <View>
      <Text style={styles.number}>Telefone</Text>
      <Text style={styles.text}>{ data.clientPhone }</Text>
    </View>
    

  </TouchableOpacity>
  );
}