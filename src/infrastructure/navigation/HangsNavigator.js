import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { InfoScreen } from '../../features/info/screens/InfoScreen';
import { HangDetailScreen } from '../../features/hangs/screens/HangDetailScreen';
import {CreateHangScreen} from '../../features/hangs/screens/CreateHang'

const HangStack = createStackNavigator();

export const HangsNavigator = () => {
  return (
    <HangStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <HangStack.Screen
        name="Info"
        component={InfoScreen}
      />
      <HangStack.Screen
        name="HangDetails"
        component={HangDetailScreen}
      />
      <HangStack.Screen
        name="CreateHang"
        component={CreateHangScreen}
      />
    </HangStack.Navigator>
  );
};
