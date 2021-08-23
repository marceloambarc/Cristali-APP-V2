import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/auth';

import { ChangePassword } from '../screens/ChangePassword';

import { Home } from '../screens/Home';
import { History } from '../screens/History';
import { UnfinishedSale } from '../screens/UnfinishedSale';
import { NewSale } from '../screens/NewSale';
import { Client } from '../screens/Client';
import { Checkout } from '../screens/Checkout';
import { Money } from '../screens/Money';
import { PagSeguroScreen } from '../screens/PagSeguroScreen';
import { Final } from '../screens/Final';
import { SendConfirmation } from '../screens/SendConfirmation';
import { Rejected } from '../screens/Rejected';

import { Test } from '../test';

const AppStack = createStackNavigator();

export function AppRoutes() {
  const { changePassword } = useAuth();
  return (
    <AppStack.Navigator
      headerMode="none"
    >
     {/*}<AppStack.Screen name="Test" component={Test} />{*/}
      {
        changePassword?
        <AppStack.Screen name="ChangePassword" component={ChangePassword} />
        :
        <>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="History" component={History} />
        <AppStack.Screen name="UnfinishedSale" component={UnfinishedSale} />
        <AppStack.Screen name="NewSale" component={NewSale} />
        <AppStack.Screen name="Client" component={Client} />
        <AppStack.Screen name="Checkout" component={Checkout} />
        <AppStack.Screen name="Money" component={Money} />
        <AppStack.Screen name="PagSeguro" component={PagSeguroScreen} />
        <AppStack.Screen name="Rejected" component={Rejected} />
        <AppStack.Screen name="SendConfirmation" component={SendConfirmation} />
        <AppStack.Screen name="Final" component={Final} />
        </>
      }
      
    </AppStack.Navigator>
  );
}