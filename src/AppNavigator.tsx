import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import {MainScreen, DetailScreen} from '~/components/screens';
import {Screen} from '~/types';

const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName={Screen.Main}>
      <MainStack.Screen name={Screen.Main} component={MainScreen} options={{headerShown: false}} />
      <MainStack.Screen
        name={Screen.Detail}
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}

const RootStack = createStackNavigator();

export default function AppNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Screen.MainStack}
        component={MainStackScreen}
        options={{headerShown: false, gestureEnabled: true}}
      />
    </RootStack.Navigator>
  );
}
