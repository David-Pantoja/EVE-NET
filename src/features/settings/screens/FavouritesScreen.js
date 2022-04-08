import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { Spacer } from '../../../components/Spacer/Spacer';
import { CustomText as Text } from '../../../components/CustomText/CustomText';
import { HangList } from '../../info/components/HangtList.styles';
import { HangtInfoCard } from '../../hangs/components/HangInfoCard';
import { LottieAnimationWrapper } from '../../../components/LottieAnimationWrapper/LottieAnimationWrapper';

import { FavouritesContext } from '../../../services/favourites/FavouritesContext';

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const SavesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <HangList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HangDetails', { hang: item })
              }
            >
              <Spacer position="bottom" size="large">
                <HangtInfoCard hang={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <LottieAnimationWrapper>
        <LottieView
          key="animation"
          resizeMode="cover"
          autoPlay
          loop
          source={require('../../../../assets/animations/heartbreak-lottie.json')}
        />
      </LottieAnimationWrapper>
      <Text variant="label">No saves yet</Text>
    </NoFavouritesArea>
  );
};
