import React from "react";
import { FlatList } from "react-native";
import { theme } from "../../global";

import { CristaliButton } from "../CristaliButton";
import { Loading } from "../Loading";

import { Order, OrderProps } from "../Order";

interface OrderListProps {
  handleOrderSelect: (order : OrderProps) => void;
  data: OrderProps[];
  isEmpty: boolean
}

export function OrderList({ data, isEmpty, handleOrderSelect } : OrderListProps) {

  const renderEmpty = () => {
    if(isEmpty){
      return (
        <Loading />
      )
    }else{
      return  (
        <CristaliButton
          color={`${theme.colors.ContinueDesactivated}`}
          title='Nenhuma Venda Encontrada...'
          onPress={() => {}}
        />
      )
    }
  }

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
      ListEmptyComponent={renderEmpty}
      initialNumToRender={4}
    />
  );
}