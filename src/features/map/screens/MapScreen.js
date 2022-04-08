import React, { useContext, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import * as Location from 'expo-location';
import { HangsContext } from '../../../services/hangs/HangsContext';
import { CustomText as Text } from '../../../components/CustomText/CustomText';

import { Logo } from '../components/Logo';
import { MapCallout } from '../components/MapCallout';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

//returns locations. navigation refers to app navigation
const HangMap = ({ navigation }) => {
  const { hangs = [] } = useContext(HangsContext);
  const [newHang, setNewHang] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [location1, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    }
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location1 = await Location.getCurrentPositionAsync({});
      setLocation(location1);
    })();
  }, []);

  return (
    <>
      <Logo />
      <Map
        region={{
          latitude: location1.coords.latitude ,
          longitude: location1.coords.longitude,
          latitudeDelta: 0.14,
          longitudeDelta: 0.01,
        }}
      >
        {hangs.map((hang) => {
          return (
            <MapView.Marker
              key={hang.name}
              title={hang.name}
              coordinate={{
                latitude: hang.location.latitude,
                longitude: hang.location.longitude,
              }}
              >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate('HangDetails', { hang })
                }
              >
                <MapCallout hang={hang} />
              </MapView.Callout>
            
              </MapView.Marker>
          );
        })}
        <MapView.Marker
              coordinate={{
                latitude: location1.coords.latitude,
                longitude: location1.coords.longitude,
              }}
              pinColor="#696AC3"
              draggable={true}
              onDragEnd={(e) => {
                navigation.navigate('CreateHang', { 
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }}
             >
              <MapView.Callout>
                <Text variant="label"> Drag me to create an event!</Text>
              </MapView.Callout>
            
              </MapView.Marker>
      </Map>
    </>
  );
};

export const MapScreen = ({ navigation }) => {
  return <HangMap navigation={navigation} />;
};
