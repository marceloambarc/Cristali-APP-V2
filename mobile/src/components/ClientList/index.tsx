import React, { useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "../../services/api";

import { ClientComponent, ClientProps } from "../ClientComponent";
import { Loading } from "../Loading";

interface Props {
  handleClientSelect: (client : ClientProps) => void;
}

export function ClientList({ handleClientSelect } : Props) {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(() => {
    if(!loading){
      return;
    }else{
      api.get('client').then(response => {
        setClients(response.data);
        setLoading(false);
      });
    }
  });

  if(loading){
    return (
      <Loading />
    );
  }else{
    return (
      <FlatList
        data={clients}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ClientComponent 
            data={item} 
            onPress={() => handleClientSelect(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
      />
    );
  }
}