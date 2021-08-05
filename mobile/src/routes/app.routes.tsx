import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { History } from '../screens/History';
import { UnfinishedSale } from '../screens/UnfinishedSale';
import { NewSale } from '../screens/NewSale';
import { Client } from '../screens/Client';
import { Checkout } from '../screens/Checkout';
import { Money } from '../screens/Money';
import { PagSeguroScreen } from '../screens/PagSeguroScreen';
import { Final } from '../screens/Final';
import { Confirmation } from '../screens/Confirmation';
import { SendConfirmation } from '../screens/SendConfirmation';

const AppStack = createStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator
      headerMode="none"
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="History" component={History} />
      <AppStack.Screen name="UnfinishedSale" component={UnfinishedSale} />
      <AppStack.Screen name="NewSale" component={NewSale} />
      <AppStack.Screen name="Client" component={Client} />
      <AppStack.Screen name="Checkout" component={Checkout} />
      <AppStack.Screen name="Money" component={Money} />
      <AppStack.Screen name="PagSeguro" component={PagSeguroScreen} />
      <AppStack.Screen name="Confirmation" component={Confirmation} />
      <AppStack.Screen name="SendConfirmation" component={SendConfirmation} />
      <AppStack.Screen name="Final" component={Final} />
      
    </AppStack.Navigator>
  );
}