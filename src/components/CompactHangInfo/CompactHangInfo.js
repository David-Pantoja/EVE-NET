import React from 'react';
import {  View, Platform } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment'
import { CustomText as Text } from '../CustomText/CustomText';

const Item = styled(View)`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const CompactHangsInfo = ({ hang }) => {

  var day = moment(hang.occurrence.seconds * 1000);
  var formatted = day.format('MMM Do, h:mm a');

  return (
    <Item>
      <Text center variant="caption">
        {hang.name}
      </Text>
      <Text center variant="caption">
        {formatted}
      </Text>
    </Item>
  );
};
