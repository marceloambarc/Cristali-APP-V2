import React from "react";
import { FlatList } from "react-native";

import { ClientComponent, ClientProps } from "../ClientComponent";

interface ClientListProps {
  handleClientSelect: (client : ClientProps) => void;
  data: ClientProps[];
}

export function ClientList({ data, handleClientSelect } : ClientListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => String(item.clientId)}
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