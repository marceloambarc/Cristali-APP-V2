import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { IOSSignIn } from '../screens/IOSSignIn';

const AuthStack = createStackNavigator();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator 
      headerMode="none"
    >
      {
        Platform.OS === 'ios'? 
        <AuthStack.Screen name='IOSSignIn' component={IOSSignIn} />
        :
        <AuthStack.Screen name='SignIn' component={SignIn} />
      }
      
    </AuthStack.Navigator>
  )
}