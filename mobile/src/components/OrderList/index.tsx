import React from "react";
import { FlatList } from "react-native";

import { Order, OrderProps } from "../Order";

interface OrderListProps {
  handleOrderSelect: (order : OrderProps) => void;
  data: OrderProps[];
}

export function OrderList({ data, handleOrderSelect } : OrderListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Order
          data={item} 
          onPress={() => handleOrderSelect(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
    />
  );
}