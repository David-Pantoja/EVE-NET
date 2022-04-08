import React from 'react';
import { View } from 'react-native';
import { Button  } from 'react-native-paper';
import styled from 'styled-components/native';

//box style around search box
const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 100%;
`;

//text box for the search method of LocationContext to be able to use
export const Logo = () => {

  return (
    <SearchContainer>
      <Button 
         mode="text"
         style={{ fontSize: 100 }}
      >
        Eve-Net
        </Button>
    </SearchContainer>
  );
};
