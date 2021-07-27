import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';

const AppStack = createStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator
      headerMode="none"
    >
      <AppStack.Screen name="Home" component={Home} />
      
    </AppStack.Navigator>
  );
}