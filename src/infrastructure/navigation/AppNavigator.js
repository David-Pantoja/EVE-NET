import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HangsNavigator } from './HangsNavigator';
import { SettingsNavigator } from './SettingsNavigator';
import { MapScreen } from '../../features/map/screens/MapScreen';
import { colors } from '../../infrastructure/theme/colors';

import { FavouritesContextProvider } from '../../services/favourites/FavouritesContext';
import { HangsContextProvider } from '../../services/hangs/HangsContext';

const TAB_ICON = {
  Create: 'create',
  Map: 'map',
  Settings: 'settings',
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
      <HangsContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: colors.brand.primary,
              inactiveTintColor: colors.brand.muted,
            }}
          >
            <Tab.Screen name="Create" component={HangsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
      </HangsContextProvider>
  </FavouritesContextProvider>
);