import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TermsAndConditionsScreen from './screens/TermsAndConditionScreen';
import LoginScreen from './screens/LoginScreen';
import BottomTabNavigator from './screens/BottomNavigator';
import RegisterScreen from './screens/RegisterScreen';
import registerNNPushToken from 'native-notify';


export default function App() {
  registerNNPushToken(14722, 'qhH5PZOB2LG0kHdWLm12of');
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'TermsAndConditions'}>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
