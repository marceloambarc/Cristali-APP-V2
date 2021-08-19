import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/auth';

import { SignIn } from '../screens/SignIn';

const AuthStack = createStackNavigator();

export function AuthRoutes() {
  const { changePassword } = useAuth();
  return (
    <AuthStack.Navigator 
      headerMode="none"
    >
      <AuthStack.Screen name='SignIn' component={SignIn} />
    </AuthStack.Navigator>
  )
}