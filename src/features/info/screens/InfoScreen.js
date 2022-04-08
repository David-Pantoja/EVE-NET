import React, { useContext, useEffect } from 'react';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { Text } from 'react-native-paper';

import { HangsContext } from '../../../services/hangs/HangsContext.js';


export const InfoScreen = ({ navigation }) => {
  const { hangs, isLoading } = useContext(HangsContext);

  useEffect(() => {
    navigation.navigate('Map')
  });

  return (
    <SafeArea>
            <Text style = {{
              textAlign: "center",
              color: '#757575',
              top: 250,
            }}> Please drag your marker on the map screen to where you want to create an event </Text>

    </SafeArea>
  );
};