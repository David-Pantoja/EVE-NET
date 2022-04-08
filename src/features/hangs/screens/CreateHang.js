import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Button, Alert } from 'react-native';
import { ActivityIndicator, Colors, TextInput  } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { AuthenticationContext } from '../../../services/authentication/AuthenticationContext';
import { HangsContext } from '../../../services/hangs/HangsContext';
import { SafeArea } from '../../../components/SafeArea/SafeArea';
import {Spacer} from '../../../components/Spacer/Spacer'
import { Text } from 'react-native-paper';
import moment from 'moment'
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import {firebaseConfig} from '../../../../apis';
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


export const CreateHangScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { update, setUpdate } = useContext(HangsContext);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [localUri, setLocalUri] = useState(true)
  const [address, setAddress] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [covid, setCovid] = useState('');
  const [occurrence, setOccurrence] = useState({
    nanoseconds:0,
    seconds:0
  });
  const [website, setWebsite] = useState('')
  const [creator, setCreator] = useState(user.uid)
  const[coords, setCoords] = useState({
    latitude: route.params.latitude,
    longitude:route.params.longitude,
})


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var ts = currentDate;
    setShow(Platform.OS === 'ios');
    setDate(ts);
    setOccurrence({
        nanoseconds:0,
        seconds: moment(ts).unix()
    })
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChooseImagePress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync();
    
      if(!result.cancelled) {
        uploadImage(result.uri)
      }
  }

  const uploadImage =  async (localUri1) => {
    setLocalUri(false)
    const response = await fetch(localUri1);
    const blob = await response.blob();

    const refChild = "userUploaded/"+creator+"/"+coords.latitude+coords.longitude;
    var ref = firebase.storage().ref(refChild);
    await ref.put(blob).then(() => {
        ref.getDownloadURL().then((url) => {
             setImage(url);
             setLocalUri(true)
      });
    });
  }

  const handleCreate = () => {
    return db.collection("hangs").doc(user.uid+"_"+name).set({
        address: address,
        creator: creator,
        creatorName: creatorName,
        description: description,
        image: image,
        location: coords,
        name: name,
        occurrence: occurrence,
        website: website,
        covid: covid,
    })
  }

  const handleSubmit = async () => {
    if(localUri && name){    
        handleCreate().then(() => {
          Alert.alert(
            "Success",
            name + " created!",
            [
              { text: "OK", onPress: () => navigation.navigate('Map') }
            ],
            { cancelable: false }
          );
        setUpdate(!update)
        });
    }
  }

  return (
    <><Text style={{
          textAlign: "center",
          top:10,
          color: '#757575',
          backgroundColor: "#f5f5f5"
      }}> Add more information to submit your event ! </Text>
      
      <SafeArea style={{
          paddingLeft: 15,
          paddingRight: 15,
      }}>
          
          <TextInput
                  label="Event Name"
                  value={name}
                  mode="outlined"
                  onChangeText={name => setName(name)} />
            <TextInput
                  label="Event Leader Name"
                  value={creatorName}
                  mode="outlined"
                  onChangeText={creatorName => setCreatorName(creatorName)} />
            <TextInput
                  label="Location Address"
                  value={address}
                  mode="outlined"
                  onChangeText={address => setAddress(address)} />
             <TextInput
                  label="External Website"
                  value={website}
                  mode="outlined"
                  onChangeText={website => setWebsite(website)} />      
            <TextInput
                  label="Description"
                  value={description}
                  mode="outlined"
                  onChangeText={description => setDescription(description)} />
            <TextInput
                  label="Covid Protocols"
                  value={covid}
                  mode="outlined"
                  onChangeText={covid => setCovid(covid)} />


            <Spacer />
            <View>
                <View>
                    <Button color="#696AC3" onPress={showDatepicker} title="Pick Date" />
                </View>
            <Spacer />
                <View>
                    <Button color="#696AC3" onPress={showTimepicker} title="Pick Time" />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>     
            <Spacer />
            <View>
                    <Button color="#696AC3" onPress={onChooseImagePress} title="Select Image" />
                </View>
            <Spacer />
            <View style={{bottom: -100}}>
                    <Button color="#696AC3" onPress={handleSubmit} title="Submit" />
            </View>



          </SafeArea>
    </>
  );
};
