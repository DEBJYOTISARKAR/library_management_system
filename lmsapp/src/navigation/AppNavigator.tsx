import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import BooksScreen from '../screens/BooksScreen';
import BorrowHistoryScreen from '../screens/BorrowScreen';

export type RootStackParamList = {
  Login: undefined;
  Books: undefined;
  BorrowHistory: {userId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Books" component={BooksScreen} />
        <Stack.Screen name="BorrowHistory" component={BorrowHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
