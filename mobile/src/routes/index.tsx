import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes(){
  const { user, signed } = useAuth();

  return (
    <NavigationContainer>
      {
        user.cgc?
        <AppRoutes />
        :
        <AuthRoutes />
      }
    </NavigationContainer>
  );
}