import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

import { FavouritesContext } from '../../services/favourites/FavouritesContext';

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ hang }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find(
    (res) => res.name === hang.name
  );

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(hang)
          : removeFromFavourites(hang)
      }
    >
      <AntDesign
        name={isFavourite ? 'heart' : 'hearto'}
        size={24}
        color={isFavourite ? 'red' : 'white'}
      />
    </FavouriteButton>
  );
};
