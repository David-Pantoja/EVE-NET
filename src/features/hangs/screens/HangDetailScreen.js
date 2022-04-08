import React, { useState, useContext } from 'react';
import { ScrollView, Linking, View, Button, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';

import { AuthenticationContext } from '../../../services/authentication/AuthenticationContext';
import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { HangsContext } from '../../../services/hangs/HangsContext';
import { Spacer } from '../../../components/Spacer/Spacer';
import { HangtInfoCard } from '../components/HangInfoCard';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import {firebaseConfig} from '../../../../apis';
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const HangDetailScreen = ({ route, navigation }) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const { hang } = route.params;
  const { update, setUpdate } = useContext(HangsContext);

  const deleteHang =  () => {
    db.collection("hangs").doc(user.uid+"_"+hang.name).delete().then(() => {
      navigation.navigate('Map');
    })
  }

  const handleDelete = () => {Alert.alert(
    "Delete Notice",
    "Are you sure you want to delete: " + hang.name +"?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "Yes", onPress: () => {
        db.collection("hangs").doc(user.uid+"_"+hang.name).delete().then(() => {
        setUpdate(!update);
        navigation.navigate('Map');
      })}}
    ],
    { cancelable: false }
  );}

  return (
    <SafeArea>
      <ScrollView>
        
        <HangtInfoCard hang={hang} />

        <List.Item title={"Address: " + hang.address} onPress={() => {
          Linking.canOpenURL("https://www.google.com/maps/place/"+hang.address).then(supported => {
          if (supported) {
            Linking.openURL("https://www.google.com/maps/place/"+hang.address);
          } else {
          console.log("Don't know how to open URI: " + hang.website);
          }})}}
        />

        <Divider />
        <List.Item title={"Website: " + hang.website} onPress={() => {
          Linking.canOpenURL(hang.website).then(supported => {
          if (supported) {
            Linking.openURL(hang.website);
          } else {
          console.log("Don't know how to open URI: " + hang.website);
          }})}}
        />
        <Divider />

        <List.Item title={"Posted By: " + hang.creatorName}/>

        <List.Accordion 
          title={"About " + hang.name}
          expanded={descriptionExpanded}
          onPress={() => setDescriptionExpanded(!descriptionExpanded)}
        >
          <List.Item title={"Description: " + hang.description} />
          <List.Item title={"Covid Protocols: " + hang.covid} />
        </List.Accordion>

      </ScrollView>
      <Spacer  position="bottom" size="large">
      {hang.creator == user.uid && 
        <View >
          <Button color="#ff8080" onPress={handleDelete} title="Delete your event" />
        </View>
      }
      </Spacer>
    </SafeArea>
  );
};