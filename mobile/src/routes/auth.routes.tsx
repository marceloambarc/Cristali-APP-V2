import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

const AuthStack = createStackNavigator();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator 
      headerMode="none"
    >
      <AuthStack.Screen name='SignIn' component={SignIn} />
    </AuthStack.Navigator>
  )
}