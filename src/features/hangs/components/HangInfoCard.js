
import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import moment from 'moment';
import { Spacer } from '../../../components/Spacer/Spacer';
import { CustomText as Text } from '../../../components/CustomText/CustomText';
import { Favourite } from '../../../components/Favourite/Favourite';

import {
  HangCard,
  HangCardCover,
  Address,
  Info,
  Section,
  Rating,
  OperationStatus,
  Icon,
} from './HangInfoCard.styles';

export const HangtInfoCard = ({ hang = {} }) => {
  const {
    name = 'Error',
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    image = 'https://firebasestorage.googleapis.com/v0/b/congapp-f2dfb.appspot.com/o/hangImgs%2Fpond_OC.png?alt=media',
    address = '100 random sick avenue',
    isOpenNow = true,
    rating = 4,
    occurrence = {
        nanoseconds:0,
        seconds:0
    },
    placeId,
  } = hang;

  var day = moment(occurrence.seconds * 1000);
  var formatted = day.format('MMMM Do YYYY, h:mm a');

  return (
      
    <HangCard elevation={2}>
      <View>
        <Favourite hang={hang} />
        <HangCardCover key={name} source={{ uri: image }} />
      </View>
      <Info>
        <Text variant="label">{name}</Text>
      </Info>
      <Info>
      <Text variant="label">{formatted}</Text>
      </Info>
    </HangCard>
  );
};
